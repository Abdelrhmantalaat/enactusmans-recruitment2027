<?php

if ( $_SERVER['REQUEST_METHOD']=='GET' && realpath(__FILE__) == realpath( $_SERVER['SCRIPT_FILENAME'] ) ) {        
    header( 'HTTP/1.0 403 Forbidden', TRUE, 403 );
    die( );
}


$curl = curl_init();

$name = $_POST['name'];
$email = $_POST['email'];
$date = $_POST['date'];
$phone = $_POST['phone'];
$residency = $_POST['residency'];
$school = $_POST['school'];
$university = $_POST['university'];
$faculty = $_POST['faculty'];
$tutorial = $_POST['radio'];
$otherTutorial = $_POST['other_option_response'];
$whatknow = $_POST['whatknow'];
$howknow = $_POST['howknow'];
$interest = $_POST['interest'];
$volunteer = $_POST['volunteer'];
$strength = $_POST['strength'];
$leader = $_POST['leader'];
$available = $_POST['available'];
$rateurself = $_POST['rateurself'];
$skillslearn = $_POST['skillslearn'];
$taskexample = $_POST['taskexample'];
$onlineresources = $_POST['onlineresources'];
$priorities = $_POST['priorities'];
$project = $_POST['project'];
$engaging = $_POST['engaging'];
$criticism = $_POST['criticism'];
$ask = $_POST['ask'];
$otherFields = $_POST['other_field_response'];

$datee=explode("-",$date);

$data[] = "";


$chkbx = '';


$values = array("Graphic Design", "Web Development", "Presentation", "Marketing", "Photography", "Fundraising", "Research and development", "Field work", "__other_option__");


$data = [
    "entry.1041785167" => $name,
    "entry.1542320257" => $email,
    "entry.1921783901_year" => $datee[0],
    "entry.1921783901_month" =>$datee[1],
    "entry.1921783901_day" => $datee[2],
    "entry.1034888980" => $phone,
    "entry.969657102" => $residency,
    "entry.1442446771" => $school,
    "entry.1052834700" => $university,
    "entry.590478216" => $faculty,
    "entry.881662986" => $tutorial,
    "entry.881662986.other_option_response" =>$otherTutorial,
    "entry.1603392820" =>$whatknow,
    "entry.2091645574" => $howknow,
    "entry.1961912970" => $interest,
    "entry.2005818525"=> $volunteer,
    "entry.1267060927" => $strength,
    "entry.1033467631" => $leader,
    "entry.1043994900" => $available,
    "entry.986324613" => $rateurself,
    "entry.1550371383" => $skillslearn,
    "entry.1725474681" => $taskexample,
    "entry.1606644202" => $onlineresources,
    "entry.2035339081" =>$priorities,
    "entry.736068933" => $project,
    "entry.1480818960" =>$engaging,
    "entry.18863860" => $criticism,
    "entry.1224952906" => $ask
];

$checkvals = $_POST['fields'];



        foreach($checkvals as $chkval)
    {
        if($chkval == $values[0])
        {
            $data += [ "entry.754710658" => "Graphic Design"];
        }
        if($chkval == $values[1])
        {
            $data += [ "entry.754710658" => "Web Development"];
        }        
        if($chkval == $values[2])
        {
            $data += [ "entry.754710658" => "Presentation"];

        }        
        if($chkval == $values[3])
        {
            $data += [ "entry.754710658" => "Marketing"];

        }
        if($chkval == $values[4])
        {
            $data += [ "entry.754710658" => "Photography"];
        }
        if($chkval == $values[5])
        {
            $data += [ "entry.754710658" => "Fundraising"];

        }        
        if($chkval == $values[6])
        {
            $data += [ "entry.754710658" => "Research and development"];

        }        
        if($chkval == $values[7])
        {
            $data += [ "entry.754710658" => "Field work"];

        }
        if($chkval == $values[8])
        {
            $data += [ "entry.754710658" => "__other_option__"];
            $data += [ "entry.754710658.other_option_response" => $otherFields];
        }
    }

    

curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://docs.google.com/forms/d/1Y9L-q9jUNSRzuyoIB1NAYwyajjvdVb8646QClvHWJmc/formResponse',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'POST',
  CURLOPT_POSTFIELDS => $data
));

$response = curl_exec($curl);
$httpcode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
curl_close($curl);


$redirect = "index.html";
print_r($checkvals);
print_r($data);

if($httpcode == 200){
    echo '<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Success! - Enactus Mansoura</title>
        <link rel="shortcut icon" href="assets/favicon.ico" type="image/x-icon">
        <link rel="icon" href="assets/favicon.ico" type="image/x-icon">
        <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap" rel="stylesheet">
    <link href="style/bootstrap.min.css" rel="stylesheet">
    <script src="script/bootstrap.bundle.min.js"></script>
    <link rel="stylesheet" href="style/style.css?v=2">
      </head>
      <body>
    
    
        <div class="heading" style=" min-height: 100vh;">
          
    
            <img id="status" src="assets/success.svg" alt="">
            <p id="statustxt">Your application was successfully <br>submitted</p>
            <!-- <div class="button">
                <div class="bott">
                    <p>Follow Us</p>
                    <div class="social" id="contact">
                       <a href="https://instagram.com/enactusmans/" target="_blank"><img src="assets/instagram.png" alt=""></a>
                       <a href="https://facebook.com/EnactusMansouraUniversity/" target="_blank"><img src="assets/facebook.png" alt=""></a>
                       <a href="https://twitter.com/enactusmans" target="_blank"><img src="assets/twitter.png" alt=""></a>
    
                    </div>
                </div>
            </div> -->
        </div>
        <div class="bar" style="position: fixed;
        ">
          <p>© All Rights Reserved. Enactus Mansoura.</p>
        </div>
        </div>
        
      </body>
    </html>';
} else{
    echo '<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Failure! - Enactus Mansoura</title>
        <link rel="shortcut icon" href="assets/favicon.ico" type="image/x-icon">
        <link rel="icon" href="assets/favicon.ico" type="image/x-icon">
        <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap" rel="stylesheet">
    <link href="style/bootstrap.min.css" rel="stylesheet">
    <script src="script/bootstrap.bundle.min.js"></script>
    <link rel="stylesheet" href="style/style.css?v=2">
      </head>
      <body>
    
    
        <div class="heading" style=" min-height: 100vh;">
          
    
            <img id="status" src="assets/failure.svg" alt="">
            <p id="statustxt">Please try again</p>
            <!-- <div class="button">
                <div class="bott">
                    <p>Follow Us</p>
                    <div class="social" id="contact">
                       <a href="https://instagram.com/enactusmans/" target="_blank"><img src="assets/instagram.png" alt=""></a>
                       <a href="https://facebook.com/EnactusMansouraUniversity/" target="_blank"><img src="assets/facebook.png" alt=""></a>
                       <a href="https://twitter.com/enactusmans" target="_blank"><img src="assets/twitter.png" alt=""></a>
    
                    </div>
                </div>
            </div> -->
        </div>
        <div class="bar" style="position: fixed;
        ">
          <p>© All Rights Reserved. Enactus Mansoura.</p>
        </div>
        </div>
        
      </body>
    </html>';

}

?>