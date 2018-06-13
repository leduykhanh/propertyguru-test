<?php
/**
 * [parse_file get the array of lines from a file starting from specific line]
 * @param  [type] $filepath   [the path of the file]
 * @param  [type] $start_line [start line to read]
 * @param  [type] $num_line   [number of lines to read]
 * @return [type]             [array of lines]
 */
function parse_file($filepath, $start_line, $num_line)
{
  $data = array();
  try {
    $file = new SplFileObject($filepath);
  } catch (Exception $exception) {
    throw new Exception("Invalid file path");
  }

  for( $i = $start_line; $i <= $start_line + $num_line; $i++) {
    $file->seek($i);
    if (!$file->valid()) break;
    $line = $file->current();
    $data[] = $line;
  }

  $file = null;
  return $data;
}

/**
 * [get_line_count count how many lines of the file]
 * @param  [type] $filepath [the path of the file]
 * @return [type]           [number]
 */
function get_line_count($filepath)
{
  $file=$filepath;
  $linecount = 0;
  $handle = fopen($file, "r");

  while(!feof($handle)){
    $line = fgets($handle);
    $linecount++;
  }

  fclose($handle);
  return $linecount;
}
