package com.sopoong.brickground.webapp.web;


import static java.util.stream.Collectors.toList;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.simple.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;

import org.springframework.web.bind.annotation.*;

import com.sopoong.brickground.webapp.web.util.FileUploadUtil;
import com.sopoong.brickground.webapp.web.util.FormBasedFileVo;

@CrossOrigin("*")
@RestController
public class FileUploadController {
	
	/** 로그설정 */
	private static final Logger LOGGER = LoggerFactory.getLogger(FileUploadController.class);
	
	@Autowired
	Environment environment;
	
    /** 첨부파일 위치 지정  => globals.properties */
	//private final String uploadDir = "/home/ubuntu/vrmall/webapp/uploadfiles/";
	//private final String uploadDir = "D:/Development/atom/react/vrmall/src/uploadfiles/";
	@Value("${resource.uploadfiles.root}")
	private String uploadDir;
	
    /** 허용할 확장자를 .확장자 형태로 연달아 기술한다. ex) .gif.jpg.jpeg.png => globals.properties */ 
	//private final String extWhiteList = ".gif.jpg.jpeg.png";
	
	@Value("${file.upload.extentions}")
	private String extWhiteList;

    /** 첨부 최대 파일 크기 지정 */
    //private final long maxFileSize = 1024 * 1024 * 100;   //업로드 최대 사이즈 설정 (100M)
	@Value("${file.upload.maxsize}")
	private long maxFileSize;
	
	@Value("${file.upload.url}")
	private String uploadUrl;
	
	@RequestMapping(value="/fileupload/insertProductImage.do", method=RequestMethod.POST)
    public void uploadProductImage(@RequestParam(value="CKEditorFuncNum", required=false) String ckEditorFuncNum, HttpServletRequest request, HttpServletResponse response) throws Exception {

		String type = "product";
		String uploadPath = uploadDir + type + '/';
		List<FormBasedFileVo> list = FileUploadUtil.uploadFilesExt(request, uploadPath, maxFileSize, extWhiteList);
		if (list.size() > 0) {
			FormBasedFileVo vo = list.get(0);	// 첫번째 이미지

			String fileUploadPath = uploadUrl + '/' + type;
		    
		    JSONObject outData = new JSONObject();
			outData.put("uploaded", true);
			outData.put("url", request.getContextPath() + "/" + fileUploadPath + "/" + vo.getServerSubPath() + "/" + vo.getPhysicalName());
			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			response.getWriter().print(outData.toString());	    
		}		
	}
	
	
	
	@RequestMapping(value="/fileupload/insertThumbnailImage.do", method=RequestMethod.POST)
    public void uploadThumbnailImage(@RequestParam(value="CKEditorFuncNum", required=false) String ckEditorFuncNum, HttpServletRequest request, HttpServletResponse response) throws Exception {

		String type = "thumbnail";
		String uploadPath = uploadDir + type + '/';
		List<FormBasedFileVo> list = FileUploadUtil.uploadFilesExtWithThumb(request, uploadPath, maxFileSize, extWhiteList);
		if (list.size() > 0) {
			FormBasedFileVo vo = list.get(0);	// 첫번째 이미지

			String fileUploadPath = uploadUrl + '/' + type;
		    
		    JSONObject outData = new JSONObject();
			outData.put("uploaded", true);
			outData.put("url", request.getContextPath() + "/" + fileUploadPath + "/" + vo.getServerSubPath() + "/" + vo.getPhysicalName());
			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			response.getWriter().print(outData.toString());
		}				
	}
	
	
	@RequestMapping(value="/fileupload/insertIntroImage.do", method=RequestMethod.POST)
    public void uploadIntroImage(@RequestParam(value="CKEditorFuncNum", required=false) String ckEditorFuncNum, HttpServletRequest request, HttpServletResponse response) throws Exception {

		String type = "intro";
		String uploadPath = uploadDir + type + '/';
		List<FormBasedFileVo> list = FileUploadUtil.uploadFilesExt(request, uploadPath, maxFileSize, extWhiteList);
		if (list.size() > 0) {
			FormBasedFileVo vo = list.get(0);	// 첫번째 이미지

			String fileUploadPath = uploadUrl + '/' + type;
		    
		    JSONObject outData = new JSONObject();
			outData.put("uploaded", true);
			outData.put("url", request.getContextPath() + "/" + fileUploadPath + "/" + vo.getServerSubPath() + "/" + vo.getPhysicalName());
			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			response.getWriter().print(outData.toString());
		}			
	}
	
	
	@RequestMapping(value="/fileupload/insertInventoryItem.do", method=RequestMethod.POST)
    public void uploadInventoryItem(@RequestParam(value="CKEditorFuncNum", required=false) String ckEditorFuncNum, HttpServletRequest request, HttpServletResponse response) throws Exception {

		String type = "inventory";
		String uploadPath = uploadDir + type + '/';
		List<FormBasedFileVo> list = FileUploadUtil.uploadFilesExt(request, uploadPath, maxFileSize, extWhiteList);
		if (list.size() > 0) {
			FormBasedFileVo vo = list.get(0);

			String fileUploadPath = uploadUrl + '/' + type;
		    
		    JSONObject outData = new JSONObject();
			outData.put("uploaded", true);
			outData.put("url", request.getContextPath() + "/" + fileUploadPath + "/" + vo.getServerSubPath() + "/" + vo.getPhysicalName());
			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			response.getWriter().print(outData.toString());   
		}				
	}
	
	@RequestMapping(value="/fileupload/insertAvatar.do", method=RequestMethod.POST)
    public void uploadAvatar(@RequestParam(value="CKEditorFuncNum", required=false) String ckEditorFuncNum, HttpServletRequest request, HttpServletResponse response) throws Exception {

		String type = "avatar";
		String uploadPath = uploadDir + type + '/';
		List<FormBasedFileVo> list = FileUploadUtil.uploadFilesExt(request, uploadPath, maxFileSize, extWhiteList);
		if (list.size() > 0) {
			FormBasedFileVo vo = list.get(0);

			String fileUploadPath = uploadUrl + '/' + type;
		    
		    JSONObject outData = new JSONObject();
			outData.put("uploaded", true);
			outData.put("url", request.getContextPath() + "/" + fileUploadPath + "/" + vo.getServerSubPath() + "/" + vo.getPhysicalName());
			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			response.getWriter().print(outData.toString());
		}			
	}
	
	
	@RequestMapping(value="/fileupload/insertManualPdf.do", method=RequestMethod.POST)
    public void uploadManualPdf(@RequestParam(value="CKEditorFuncNum", required=false) String ckEditorFuncNum, HttpServletRequest request, HttpServletResponse response) throws Exception {

		String type = "manual";
		String uploadPath = uploadDir + type + '/';
		List<FormBasedFileVo> list = FileUploadUtil.uploadFilesExt(request, uploadPath, maxFileSize, extWhiteList);
		if (list.size() > 0) {
			FormBasedFileVo vo = list.get(0);	// 첫번째 매뉴얼

			String fileUploadPath = uploadUrl + '/' + type;
		    
		    JSONObject outData = new JSONObject();
			outData.put("uploaded", true);
			outData.put("url", request.getContextPath() + "/" + fileUploadPath + "/" + vo.getServerSubPath() + "/" + vo.getPhysicalName());
			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			response.getWriter().print(outData.toString());
		}			
	}
	
	/**
     * 암호화
     *
     * @param encrypt
     */
    private String encrypt(String encrypt) {

    	/*
    	try {
			return cryptoService.encrypt(encrypt); // Handles URLEncoding.
			//return cryptoService.encryptNone(encrypt); // Does not handle URLEncoding.
        } catch(IllegalArgumentException e) {
    		LOGGER.error("[IllegalArgumentException] Try/Catch...usingParameters Runing : "+ e.getMessage());
        } catch (Exception e) {
        	LOGGER.error("[" + e.getClass() +"] :" + e.getMessage());
        }
        */
    	
		return encrypt;
    }
    
    /**
     * 복호화
     *
     * @param decrypt
     */
    private String decrypt(String decrypt){

    	/*
    	try {
    		//return cryptoService.decrypt(decrypt); // Handles URLDecoding.
    		return cryptoService.decryptNone(decrypt); // Does not handle URLDecoding.
        } catch(IllegalArgumentException e) {
    		LOGGER.error("[IllegalArgumentException] Try/Catch...usingParameters Runing : "+ e.getMessage());
        } catch (Exception e) {
        	LOGGER.error("[" + e.getClass() +"] :" + e.getMessage());
        }
        */
    	
		return decrypt;
    }

	      
}
