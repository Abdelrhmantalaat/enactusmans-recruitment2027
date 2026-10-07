const http = require("http");
const fs = require("fs");
const path = require("path");
const querystring = require("querystring");

const PORT = process.env.PORT || 3000;

const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSexkC04-UsvsQ18TmOOj4DVVaLPF7ulavqJBETLnmyMtSPTlA/formResponse";

const server = http.createServer(async (req, res) => {
  // =========================
  // GET REQUESTS
  // =========================

  if (req.method === "GET") {
    // IMPORTANT:
    // Remove query parameters like ?v=2
    const url = new URL(req.url, `http://localhost:${PORT}`);
    let pathname = decodeURIComponent(url.pathname);

    if (pathname === "/") {
      pathname = "/index.html";
    }

    const filePath = path.join(__dirname, pathname);

    // Prevent accessing files outside project
    if (!filePath.startsWith(__dirname)) {
      res.writeHead(403);
      res.end("Forbidden");
      return;
    }

    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.log("File not found:", filePath);

        res.writeHead(404);
        res.end("Not Found");
        return;
      }

      const ext = path.extname(filePath).toLowerCase();

      const contentTypes = {
        ".html": "text/html; charset=UTF-8",
        ".css": "text/css; charset=UTF-8",
        ".js": "application/javascript; charset=UTF-8",
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".svg": "image/svg+xml",
        ".ico": "image/x-icon",
        ".woff": "font/woff",
        ".woff2": "font/woff2",
      };

      const contentType = contentTypes[ext] || "application/octet-stream";

      res.writeHead(200, {
        "Content-Type": contentType,
      });

      res.end(data);
    });

    return;
  }

  // =========================
  // FORM SUBMISSION
  // =========================

  if (req.method === "POST" && req.url === "/api/submit") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      try {
        const data = querystring.parse(body);

        console.log("\n==============================");
        console.log("FORM DATA RECEIVED");
        console.log("==============================");
        console.log(data);

        const googleData = new URLSearchParams();

        // =========================
        // PERSONAL
        // =========================

        googleData.append("entry.1884265043", data.name || "");

        googleData.append("entry.893066703", data.email || "");

        googleData.append("entry.762664935", data.phone || "");

        googleData.append("entry.777963996", data.residency || "");

        googleData.append("entry.16062350", data.birthDate || "");

        googleData.append("entry.525139968", data.highSchool || "");

        // =========================
        // ACADEMIC
        // =========================

        googleData.append("entry.1951007764", data.university || "");

        googleData.append("entry.943573766", data.faculty || "");

        // Other / Source field
        if (data.tutorialYear === "__other_option__") {
          googleData.append("entry.914168470", "__other_option__");

          googleData.append(
            "entry.914168470.other_option_response",
            data.tutorialYearOther || "",
          );
        } else {
          googleData.append("entry.914168470", data.tutorialYear || "");
        }

        googleData.append("entry.1224563023", data.instagram || "");

        // =========================
        // OPEN QUESTIONS
        // =========================

        googleData.append("entry.1964115254", data.whatKnow || "");

        googleData.append("entry.211995956", data.howKnow || "");

        googleData.append("entry.1600134367", data.difference || "");

        googleData.append("entry.212046804", data.interest || "");

        googleData.append("entry.1208719334", data.volunteerWork || "");

        googleData.append("entry.212781714", data.strengthWeakness || "");

        googleData.append("entry.1706350781", data.teamPreference || "");

        googleData.append("entry.513669972", data.leadershipRole || "");

        googleData.append("entry.1033504492", data.availability || "");

        googleData.append("entry.1556742120", data.workLifeBalance || "");

        googleData.append("entry.1711800281", data.responsibilities || "");

        // =========================
        // FIELDS
        // =========================

        let fields = data["fields[]"];

        if (fields) {
          if (!Array.isArray(fields)) {
            fields = [fields];
          }

          fields.forEach((field) => {
            if (field === "__other_option__") {
              googleData.append("entry.1842565250", "__other_option__");

              googleData.append(
                "entry.1842565250.other_option_response",
                data.otherField || "",
              );
            } else {
              googleData.append("entry.1842565250", field);
            }
          });
        }

        // Rating / examples

        googleData.append("entry.1891756682", data.fieldRating || "");

        // =========================
        // REMAINING QUESTIONS
        // =========================

        googleData.append("entry.65505240", data.whatAdd || "");

        googleData.append("entry.2032761895", data.learning || "");

        googleData.append("entry.14291829", data.reliableSource || "");

        googleData.append("entry.1862403506", data.fieldVsOnline || "");

        googleData.append("entry.1531088855", data.researchExample || "");

        googleData.append("entry.1093445631", data.sponsorChoice || "");

        googleData.append("entry.517038073", data.innovativeSolution || "");

        googleData.append("entry.139029733", data.knownOrNewField || "");

        googleData.append("entry.1710103116", data.teamBehavior || "");

        googleData.append("entry.1037119084", data.independentOrTeam || "");

        googleData.append("entry.1782600271", data.criticism || "");

        googleData.append("entry.1261012492", data.ask || "");

        // =========================
        // SEND TO GOOGLE FORMS
        // =========================

        console.log("\nSending data to Google Forms...");

        const response = await fetch(FORM_URL, {
          method: "POST",

          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },

          body: googleData.toString(),
        });

        console.log(
          "Google Forms response:",
          response.status,
          response.statusText,
        );

        const responseText = await response.text();

        console.log("Google Forms response body:");
        console.log(responseText);

        if (response.ok || response.status === 302) {
          res.writeHead(302, {
            Location: "/success.html",
          });

          res.end();
        } else {
          console.log("Google Forms rejected the submission.");

          res.writeHead(302, {
            Location: "/fail.html",
          });

          res.end();
        }
      } catch (error) {
        console.error("SUBMISSION ERROR:", error);

        res.writeHead(302, {
          Location: "/fail.html",
        });

        res.end();
      }
    });

    return;
  }

  // =========================
  // 404
  // =========================

  res.writeHead(404);
  res.end("Not Found");
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

