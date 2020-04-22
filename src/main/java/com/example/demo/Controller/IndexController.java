package com.example.demo.Controller;

import org.apache.commons.io.FileUtils;
import org.apache.tomcat.util.http.fileupload.servlet.ServletFileUpload;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;


/**
 * @author Created by niugang on 2019/1/24/11:42
 */
@SuppressWarnings("ResultOfMethodCallIgnored")
@Controller
@Validated
public class IndexController {


//    private static String FILENAME = "";

    private static String FILEPATH = "";


    @Value("${xdja.upload.file.path}")
    private String decryptFilePath;

    @Value("${xdja.upload.file.temp}")
    private String decryptFilePathTemp;

    @GetMapping("/")
    public String index() {
        return "index";
    }

    @GetMapping("/webuploader")
    public String webuploader() {
        return "webupload";
    }

    @GetMapping("downloaderror")
    public String downloaderror() {
        return "error";
    }

    /**
     * 分片上传
     *
     * @return ResponseEntity<Void>
     */
    @PostMapping("/upload")
    @ResponseBody
    public ResponseEntity<Void> decrypt(HttpServletRequest request, @RequestParam(value = "file", required = false) MultipartFile file, Integer chunks, Integer chunk, String name, String guid) throws IOException {
        boolean isMultipart = ServletFileUpload.isMultipartContent(request);
        if (isMultipart) {
            if (file == null) {
//                throw new ServiceException(ExceptionEnum.PARAMS_VALIDATE_FAIL);
            }
            System.out.println("guid:" + guid);
            if (chunks == null && chunk == null) {
                chunk = 0;
            }
            File outFile = new File(decryptFilePathTemp+File.separator+guid, chunk + ".part");
//            if ("".equals(FILENAME)) {
//                FILENAME = name;
//            }
            InputStream inputStream = file.getInputStream();
            FileUtils.copyInputStreamToFile(inputStream, outFile);
        }
        return ResponseEntity.ok().build();
    }

    /**
     * 合并所有分片
     *
     * @throws Exception Exception
     */
    @GetMapping("/merge")
    @ResponseBody
    public void byteMergeAll(String guid,String name) throws Exception {
        System.out.println("merge:"+guid);
        File file = new File(decryptFilePathTemp+File.separator+guid);
        if (file.isDirectory()) {
            File[] files = file.listFiles();
            if (files != null && files.length > 0) {
                File partFile = new File(decryptFilePath + File.separator + name);
                for (int i = 0; i < files.length; i++) {
                    File s = new File(decryptFilePathTemp+File.separator+guid, i + ".part");
                    FileOutputStream destTempfos = new FileOutputStream(partFile, true);
                    FileUtils.copyFile(s,destTempfos );
                    destTempfos.close();
                }
                FileUtils.deleteDirectory(file);
//                FILENAME = "";
            }

        }



    }

    /**
     * 非分片上传
     *
     * @param request request
     * @param file    file
     * @return ResponseEntity<Void>
     * @throws IOException IOException
     */
    @PostMapping("/oldupload")
    @ResponseBody
    public ResponseEntity<Void> decrypt(HttpServletRequest request, @RequestParam(value = "file", required = false) MultipartFile file) throws IOException {
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter yyyymMddHHmmSS = DateTimeFormatter.ofPattern("YYYYMMddHHmmSS");
        String format = now.format(yyyymMddHHmmSS);
        String path = decryptFilePath + File.separator + format;
        File fileDirty = new File(path);
        if (!fileDirty.exists()) {
            fileDirty.mkdirs();
        }
        FILEPATH=path + File.separator + file.getOriginalFilename();
        File outFile = new File(FILEPATH);
        request.setAttribute("filePath",FILEPATH);
        FileUtils.copyInputStreamToFile(file.getInputStream(), outFile);
        return ResponseEntity.ok().build();
    }



//    @GetMapping("/json")
//    @ResponseBody
//    public  ResponseEntity<Person>  testJson(){
//        Person person = new Person();
//        person.setId(UUID.randomUUID().toString().replaceAll("-",""));
//        person.setAddress("陕西省西安市长安区");
//        person.setPhone("12345679122");
//        person.setName("张三");
//        person.setBrithday(LocalDateTime.now());
//       return  ResponseEntity.ok(person);
//    }

}
