<?php

if ( $_SERVER['REQUEST_METHOD']=='GET' && realpath(__FILE__) == realpath( $_SERVER['SCRIPT_FILENAME'] ) ) {        
    header( 'HTTP/1.0 403 Forbidden', TRUE, 403 );
    die( );
}

// $localhost = "localhost"; #localhost
// $dbusername = "enacoqxt"; #username of phpmyadmin
// $dbpassword = "LlKj8B3vem9N";  #password of phpmyadmin
// $dbname = "enacoqxt_forms";  #database name



$curl = curl_init();

$name = $_POST['name'];
$email = $_POST['email'];
$id = $_POST['id'];
$phone = $_POST['phone'];
$address = $_POST['address'];
$school = $_POST['school'];
$faculty = $_POST['faculty'];
$tutorial = $_POST['radio'];
$whatknow = $_POST['whatknow'];
$howknow = $_POST['howknow'];
$attract = $_POST['attract'];
$volunteer = $_POST['volunteer'];
$rateurself = $_POST['rateurself'];
$available = $_POST['available'];
$alone = $_POST['alone'];
$priorities = $_POST['priorities'];
$strength = $_POST['strength'];
$extraordinary = $_POST['extraordinary'];
$role = $_POST['role'];
// $choice = $_POST['choice'];
// $measure = $_POST['measure'];
$problem = $_POST['problem'];
$project = $_POST['project'];
$ask = $_POST['ask'];
$date = $_POST['date'];
$talk = $_POST['talk'];

$datee=explode("-",$date);

$data[] = "";


$chkbx = '';
$checkvals = $_POST['fields'];

$values = array("Graphic Design", "Presentation", "Training", "Photography", "Marketing", "Fundraising", "Field Work", "Research and Development", "None");


$data = [
    "entry.875491124" => $tutorial,
    "entry.1990464352" => $name,
    "entry.2105279865" => $email,
    "entry.478265899" => $id,
    "entry.1150162162" => $address,
    "entry.2038126689" => $phone,
    "entry.1217211156" => $school,
    "entry.1576008390" => $faculty,
    "entry.908745498" => $whatknow,
    "entry.1795517836" =>$howknow,
    "entry.782076237" =>$attract,
    "entry.811610329" => $volunteer,
    "entry.808554167" => $rateurself,
    "entry.1391285541"=> $available,
    "entry.559149197" => $alone,
    // "entry.610359189" => $environment,
    "entry.738956715" => $strength,
    "entry.604326962" => $priorities,
    "entry.88357485" => $extraordinary,
    // "entry.1993334917" => $choice,
    // "entry.261504767" => $measure,
    "entry.1993334917" => $role,
    "entry.1477738857" => $problem,
    "entry.1864758313" => $project,
    "entry.1371658927" =>$ask,
    "entry.654416144_year" => $datee[0],
    "entry.654416144_month" =>$datee[1],
    "entry.654416144_day" => $datee[2],
    "entry.480849835" => $talk
];

    /*foreach($checkvals as $chkval)
    {
        if($chkval == $values[0])
        {
            $chkbx .= 'entry.1773566002=Graphic Design';
            $data += [ "entry.1773566002" => "Graphic Design"];

        }
        if($chkval == $values[1])
        {
            $chkbx .= 'entry.1773566002=Presentation';
        }        
        if($chkval == $values[2])
        {
            $chkbx .= 'entry.1773566002=Training';
        }        
        if($chkval == $values[3])
        {
            $chkbx .= 'entry.1773566002=Photography';
            $data += [ "entry.1773566002" => "Photography"];

        }
        if($chkval == $values[4])
        {
            $chkbx .= 'entry.1773566002=Marketing';
        }
        if($chkval == $values[5])
        {
            $chkbx .= 'entry.1773566002=Fundraising';
        }        
        if($chkval == $values[6])
        {
            $chkbx .= 'entry.1773566002=Field Work';
        }        
        if($chkval == $values[7])
        {
            $chkbx .= 'entry.1773566002=Research and Development';
        }
        if($chkval == $values[8])
        {
            $chkbx .= 'entry.1773566002=None';

        }
    }*/

        foreach($checkvals as $chkval)
    {
        if($chkval == $values[0])
        {
            $data += [ "entry.1773566002" => "Graphic Design"];

        }
        if($chkval == $values[1])
        {
            $data += [ "entry.1854438213" => "Presentation"];
        }        
        if($chkval == $values[2])
        {
            $data += [ "entry.334029387" => "Training"];

        }        
        if($chkval == $values[3])
        {
            $data += [ "entry.1165254292" => "Photography"];

        }
        if($chkval == $values[4])
        {
            $data += [ "entry.566308795" => "Marketing"];
        }
        if($chkval == $values[5])
        {
            $data += [ "entry.797232967" => "Fundraising"];

        }        
        if($chkval == $values[6])
        {
            $data += [ "entry.2094949900" => "Field Work"];

        }        
        if($chkval == $values[7])
        {
            $data += [ "entry.857078407" => "Research and Development"];

        }
        /*if($chkval == $values[8])
        {
            $data += [ "entry.1773566002" => "None"];

        }*/
    }

    


    /*"entry.875491124=3rd&entry.1773566002=Graphic+Design&entry.1773566002=Presentation&entry.1773566002=Training&entry.1773566002=Photography&entry.1773566002=Marketing&entry.1773566002=Fundraising&entry.1773566002=Field+Work&entry.1773566002=Research+and+Development&entry.1773566002=None&entry.1990464352=Name&entry.2105279865=Email&entry.478265899=National+id&entry.1150162162=Address+&entry.2038126689=Phone+&entry.1217211156=High+school&entry.1576008390=Faculty&entry.908745498=What+do+you+know&entry.1795517836=How+do+you+know&entry.782076237=What+about+enactus+that&entry.811610329=Have+you+done+any+volunteer+work&entry.808554167=Please+rate+yourself&entry.1391285541=what+days+and+times&entry.559149197=What+do+you+think+you+will+add&entry.610359189=What+type+of+work+environment&entry.738956715=What+are+your+strengths&entry.604326962=In+your+opinion+is+it+better+to&entry.88357485=Do+you+have+a+role+model+&entry.1993334917=Describe+when+you+had+to+make&entry.261504767=How+do+measure+success%3F&entry.1477738857=What+is+the+major+social%2C&entry.1864758313=Your+sponsor+made&entry.1371658927=Now+its+your+turn+to&entry.654416144_year=2022&entry.654416144_month=10&entry.654416144_day=11&dlut=1664956363985&entry.875491124_sentinel=&entry.1773566002_sentinel=&fvv=1&partialResponse=%5Bnull%2Cnull%2C%226866751864966370423%22%5D&pageHistory=0&fbzx=2359009129544930011"*/



curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://docs.google.com/forms/d/e/1FAIpQLSe0VE26MAehq6kFn29s6O0WxFU_OmtNgG_-BEVMBqyiPaMzJg/formResponse',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'POST',
  CURLOPT_POSTFIELDS => $data     /*"entry.875491124=".$tutorial.$chkbx."&entry.1990464352=".$name."&entry.2105279865=".$email."&entry.478265899=".$id."&entry.1150162162=".$address."&entry.2038126689=".$phone."&entry.1217211156=".$school."&entry.1576008390=".$faculty."&entry.908745498=".$whatknow."&entry.1795517836=".$howknow."&entry.782076237=".$attract."&entry.811610329=".$volunteer."&entry.808554167=".$rate."&entry.1391285541=".$available."&entry.559149197=".$add."&entry.610359189=".$environment."&entry.738956715=".$strength."&entry.604326962=".$perfect."&entry.88357485=".$role."&entry.1993334917=".$choice."&entry.261504767=".$measure."&entry.1477738857=".$problem."&entry.1864758313=".$project."&entry.1371658927=".$ask."&entry.654416144_year=".$datee[0]."&entry.654416144_month=".$datee[1]."&entry.654416144_day=".$datee[2],
  CURLOPT_HTTPHEADER => array('Content-Type: application/x-www-form-urlencoded','Content-Length: 0'),*/
));

$response = curl_exec($curl);
$httpcode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
curl_close($curl);

// $conn = mysqli_connect($localhost,$dbusername,$dbpassword,$dbname);
// $sql = "INSERT into forms(name,phone,email) VALUES('$name','$phone','$email')";
// mysqli_query($conn,$sql);


$redirect = "index.html";

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