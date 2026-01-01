package com.sopoong.brickground.webapp.web.util;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

/**
 * @Class Name  : EgovFileUploadUtil.java
 * @Description : Spring 기반 File Upload 유틸리티
 * @Modification Information
 *
 *   수정일                   수정자                수정내용
 *   ----------     --------     ---------------------------
 *   2009.08.26     한성곤               최초 생성
 *   2018.08.17     신용호               uploadFilesExt(확장자 기록) 추가
 *
 * @author 공통컴포넌트 개발팀 한성곤
 * @since 2009.08.26
 * @version 1.0
 * @see
 */
public class FileUploadUtil extends FormBasedFileUtil {
	/**
	 * 파일을 Upload 처리한다.
	 *
	 * @param request
	 * @param where
	 * @param maxFileSize
	 * @return
	 * @throws Exception
	 */
	public static List<FormBasedFileVo> uploadFiles(HttpServletRequest request, String where, long maxFileSize) throws Exception {
		List<FormBasedFileVo> list = new ArrayList<FormBasedFileVo>();

		MultipartHttpServletRequest mptRequest = (MultipartHttpServletRequest) request;
		Iterator<?> fileIter = mptRequest.getFileNames();

		while (fileIter.hasNext()) {
			MultipartFile mFile = mptRequest.getFile((String) fileIter.next());

			FormBasedFileVo vo = new FormBasedFileVo();

			String tmp = mFile.getOriginalFilename();

			if (tmp.lastIndexOf("\\") >= 0) {
				tmp = tmp.substring(tmp.lastIndexOf("\\") + 1);
			}

			vo.setFileName(tmp);
			vo.setContentType(mFile.getContentType());
			vo.setServerSubPath(getTodayString());
			vo.setPhysicalName(getPhysicalFileName());
			vo.setSize(mFile.getSize());

			if (tmp.lastIndexOf(".") >= 0) {
				vo.setPhysicalName(vo.getPhysicalName()); // 2012.11 KISA 보안조치
			}

			if (mFile.getSize() > 0) {
				InputStream is = null;

				try {
					is = mFile.getInputStream();
					saveFile(is, new File(WebUtil.filePathBlackList(where + SEPERATOR + vo.getServerSubPath() + SEPERATOR + vo.getPhysicalName())));
					
				} finally {
					if (is != null) {
						is.close();
					}
				}
				list.add(vo);
			}
		}

		return list;
	}
	
	/**
	 * 파일을 Upload(확장명 저장 및 확장자 제한) 처리한다.
	 *
	 * @param request
	 * @param where
	 * @param maxFileSize
	 * @return
	 * @throws Exception
	 */
	public static List<FormBasedFileVo> uploadFilesExt(HttpServletRequest request, String where, long maxFileSize, String extensionWhiteList) throws Exception {
		List<FormBasedFileVo> list = new ArrayList<FormBasedFileVo>();

		MultipartHttpServletRequest mptRequest = (MultipartHttpServletRequest) request;
		Iterator<?> fileIter = mptRequest.getFileNames();

		while (fileIter.hasNext()) {
			MultipartFile mFile = mptRequest.getFile((String) fileIter.next());

			FormBasedFileVo vo = new FormBasedFileVo();

			String tmp = mFile.getOriginalFilename();

			if (tmp.lastIndexOf("\\") >= 0) {
				tmp = tmp.substring(tmp.lastIndexOf("\\") + 1);
			}
			String ext = "";
			if ( tmp.lastIndexOf(".") > 0 )
				ext = getFileExtension(tmp).toLowerCase();
			else
				throw new SecurityException("Unacceptable file extension."); // 허용되지 않는 확장자 처리
			if ( extensionWhiteList.indexOf(ext) < 0 )
				throw new SecurityException("Unacceptable file extension."); // 허용되지 않는 확장자 처리
			
			vo.setFileName(tmp);
			vo.setContentType(mFile.getContentType());
			vo.setServerSubPath(getTodayString());
			vo.setPhysicalName(getPhysicalFileName()+"."+ext);
			vo.setSize(mFile.getSize());

			if (tmp.lastIndexOf(".") >= 0) {
				vo.setPhysicalName(vo.getPhysicalName()); // 2012.11 KISA 보안조치
			}

			if (mFile.getSize() > 0) {
				InputStream is = null;

				try {
					is = mFile.getInputStream();
					saveFile(is, new File(WebUtil.filePathBlackList(where + SEPERATOR + vo.getServerSubPath() + SEPERATOR + vo.getPhysicalName())));
				} finally {
					if (is != null) {
						is.close();
					}
				}
				list.add(vo);
			}
		}

		return list;
	}
	
	
	/**
	 * 파일을 Upload(확장명 저장 및 확장자 제한) 처리한다.
	 *
	 * @param request
	 * @param where
	 * @param maxFileSize
	 * @return
	 * @throws Exception
	 */
	public static List<FormBasedFileVo> uploadFilesExtWithThumb(HttpServletRequest request, String where, long maxFileSize, String extensionWhiteList) throws Exception {
		List<FormBasedFileVo> list = new ArrayList<FormBasedFileVo>();

		MultipartHttpServletRequest mptRequest = (MultipartHttpServletRequest) request;
		Iterator<?> fileIter = mptRequest.getFileNames();

		while (fileIter.hasNext()) {
			MultipartFile mFile = mptRequest.getFile((String) fileIter.next());

			FormBasedFileVo vo = new FormBasedFileVo();

			String tmp = mFile.getOriginalFilename();

			if (tmp.lastIndexOf("\\") >= 0) {
				tmp = tmp.substring(tmp.lastIndexOf("\\") + 1);
			}
			String ext = "";
			if ( tmp.lastIndexOf(".") > 0 )
				ext = getFileExtension(tmp).toLowerCase();
			else
				throw new SecurityException("Unacceptable file extension."); // 허용되지 않는 확장자 처리
			if ( extensionWhiteList.indexOf(ext) < 0 )
				throw new SecurityException("Unacceptable file extension."); // 허용되지 않는 확장자 처리
			
			vo.setFileName(tmp);
			vo.setContentType(mFile.getContentType());
			vo.setServerSubPath(getTodayString());
			vo.setPhysicalName(getPhysicalFileName()+"."+ext);
			vo.setSize(mFile.getSize());

			if (tmp.lastIndexOf(".") >= 0) {
				vo.setPhysicalName(vo.getPhysicalName()); // 2012.11 KISA 보안조치
			}

			if (mFile.getSize() > 0) {
				InputStream is = null;

				try {
					is = mFile.getInputStream();
					saveFile(is, new File(WebUtil.filePathBlackList(where + SEPERATOR + vo.getServerSubPath() + SEPERATOR + vo.getPhysicalName())));
					
					String fileDirectory = where + SEPERATOR + vo.getServerSubPath() + SEPERATOR;
					String renameFileM = vo.getPhysicalName();
					String renameFileT = vo.getPhysicalName().replace("."+ext, "_thumb"+"."+ext);
					int mWidth = 480;
					int mHeight = 400;
					int thumbWidth = 72;
					int thumbHeight = 60;
					
					try {
						//renameFileL = ImageUtil.imageResize(fileVo.getDir(), fileVo.getOrganizedFileName(), fileVo.getDir(), renameFileL + Constants.IMAGE_EXT, "",
						//		Constants.IMAGE_LARGE00_WIDTH, Constants.IMAGE_LARGE00_HEIGHT);
						//renameFileM = ImageUtil.imageResize(fileVo.getDir(), fileVo.getOrganizedFileName(), fileVo.getDir(), renameFileM + Constants.IMAGE_EXT, "",
						//		Constants.IMAGE_MIDDLE00_WIDTH, Constants.IMAGE_MIDDLE00_HEIGHT);
						//renameFileS = ImageUtil.imageResize(fileVo.getDir(), fileVo.getOrganizedFileName(), fileVo.getDir(), renameFileS + Constants.IMAGE_EXT, "",
						//		Constants.IMAGE_SMALL00_WIDTH, Constants.IMAGE_SMALLE00_HEIGHT);
						
						renameFileM = ImageUtil.imageResize(fileDirectory, vo.getPhysicalName(), fileDirectory, renameFileM, "", mWidth, mHeight);
						renameFileT = ImageUtil.imageResize(fileDirectory, vo.getPhysicalName(), fileDirectory, renameFileT, "", thumbWidth, thumbHeight);
		
					} catch (InterruptedException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				} finally {
					if (is != null) {
						is.close();
					}
				}
				list.add(vo);
			}
		}

		return list;
	}
	
	/**
	 * 파일 확장자를 추출한다.
	 *
	 * @param fileNamePath
	 * @return
	 */
	public static String getFileExtension(String fileNamePath) {
		
		String ext = fileNamePath.substring(fileNamePath.lastIndexOf(".") + 1,fileNamePath.length());
		
		return (ext == null) ? "" : ext;
	}
}
