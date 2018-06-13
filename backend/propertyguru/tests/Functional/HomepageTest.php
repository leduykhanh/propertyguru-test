<?php

namespace Tests\Functional;

class HomepageTest extends BaseTestCase
{
    /**
     * Test that the data route will no accept get method
     */
    public function testGetMethod()
    {
        $response = $this->runApp('GET', '/data');

        $this->assertEquals(405, $response->getStatusCode());
    }

    /**
     * Test that the data route will return error if no path sent
     */
    public function testEmptyBody()
    {
        $response = $this->runApp('POST', '/data');

        $this->assertEquals(400, $response->getStatusCode());

    }
    /**
     * Test that the data route will return error with wrong file path
     */
    public function testWrongFilePath()
    {
        $sample_input = array(
          'path'=> 'abcd',
          'startIndex' => 0,
          'pageSize' => 10
        );
        $response = $this->runApp('POST', '/data', $sample_input);

        $this->assertEquals(400, $response->getStatusCode());
    }

    /**
     * Test that the data route will return data with sample log file
     */
    public function testSamplefile()
    {
        $sample_input = array(
          'path'=> dirname(__FILE__, 3) . '/logs/test.log',
          'startIndex' => 0,
          'pageSize' => 10
        );
        $sample_output = '{"data":["1\n","2\n","3\n","4\n","5\n","6\n","7\n","8\n","9\n","10\n","11\n"]}';
        $response = $this->runApp('POST', '/data', $sample_input);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertContains($sample_output, (string)$response->getBody());
    }
}
