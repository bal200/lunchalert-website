#!/usr/bin/env php
<?php
  ini_set('max_execution_time', 100800); //3600 seconds = 1 hour

  define("API", "http://api.ratings.food.gov.uk"); /* Food standards api url, no trailing slash */
  define("OUT_NAME", "establishments.csv"); /* file to write the csv output to. will append if exisits */
  define("PAGE_SIZE", 100); /* Qty of establishments on each list request to api  */

  $totalPages = 0; /* this is worked out later */
  
  $page = 1; /* start at this page number */
  $finishpage = 499; /* last page to do (inclusive) */
  
  $out = fopen(OUT_NAME, "a");
  if ($out) {
    /* write out some headings to the CSV */
    fwrite($out, "FHRSID,LocalAuthorityName,LocalAuthorityBusinessID,BusinessName,BusinessType,".
           "AddressLine1,AddressLine2,AddressLine3,AddressLine4,PostCode,Phone\n");
    do{ /* loop through pages */
      
      $estArr = getEstablishmentList( $page );
      
      foreach($estArr as $e) { /* loop through each establishment on page */
        //print $e->FHRSID." - ".$e->BusinessName."<br/>\n";
        
        $efull = getFullEstablishment( $e->FHRSID );
        if ($efull->BusinessTypeID == 7846) { /* 7846 is Mobile caterer */
          print $efull->BusinessName." is a mobile caterer <br>\n";
        }
          $line=array ($efull->FHRSID,
                $efull->LocalAuthorityName,
                $efull->LocalAuthorityBusinessID,
                $efull->BusinessName,
                $efull->BusinessType,
                $efull->AddressLine1,
                $efull->AddressLine2,
                $efull->AddressLine3,
                $efull->AddressLine4,
                $efull->PostCode,
                $efull->Phone);
          if ( fputcsv($out, $line) == false)
              print "error writing line to csv output file.<br/>\n";
          //fwrite($out, $line);
        
      }
      print "that was page ".$page." of ".$totalPages."<br/>\n";
      flush(); /* help push our screen logging to the browser */
      $page++;
      if ($page > $finishpage) break;
    }while ($page < $totalPages);
  }
  fclose($out);
 

   /*********************  **************************************/
  function getEstablishmentList($page) {
    global $totalPages;
    /********************* CURL ONE OUT **************************************/
    $url = API."/Establishments/basic/".$page."/".PAGE_SIZE."?businessTypeId=7846"; /* 7846 is mobile catering */
    $string_xml=""; $count=0;

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    //return the transfer as a string
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    // mak this a normal get request
    curl_setopt($ch, CURLOPT_HTTPGET, true);
    // set some food standards api specifics in the header
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
                  'x-api-version: 2',
                  'accept: application/json',
                  'content-type: application/json'
                ) );
    // $output contains the output string
    $string_xml = curl_exec($ch);
    
    $info = curl_getinfo($ch);
    if (isset($info['curl_error'])){
      print "curl ".$info['curl_error']."\n\n";
    }
    curl_close($ch);
    $json = json_decode($string_xml);
    
    if ($totalPages==0) {
      $totalPages = $json->meta->totalPages;
    }
  
    return ( $json->establishments );
  }
  
  /*********************  **************************************/
  function getFullEstablishment($fhid) {
    $url = API."/Establishments/".$fhid; /* the businesses id on food standards site */
    $string_xml=""; $count=0;
  
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    //return the transfer as a string
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    // mak this a normal get request
    curl_setopt($ch, CURLOPT_HTTPGET, true);
    // set some food standards api specifics in the header
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
                  'x-api-version: 2',
                  'accept: application/json',
                  'content-type: application/json'
                ) );
    
    // $output contains the output string
    $string_xml = curl_exec($ch);
    
    $info = curl_getinfo($ch);
    if (isset($info['curl_error'])){
      print "curl ".$info['curl_error']."\n\n";
    }

    $json = json_decode($string_xml);
    curl_close($ch);
    
    return $json;
  }
  
  
?>