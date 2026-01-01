package com.sopoong.brickground.webapp.web.util;

import java.awt.Color;


import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.image.BufferedImage;
import java.awt.image.PixelGrabber;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

import javax.imageio.ImageIO;
import javax.swing.ImageIcon;



public class ImageUtil {


    /**
     * <PRE>
     * Desc     : Resizing Image
     * </PRE>
     * @param     inPath : Source Image File Path
     * @param     inFileName : Source Image File Name
     * @param     outPath : Target Image File Path
     * @param     outFileName : Create Image File Name
     * @param     width : Image Width For Resizing
     * @param     height : Image Height For Resizing
     * @return    New File Name
     * @throws IOException
     * @throws OperationFailedException
     * @throws InterruptedException
     * @throws InterruptedException
     * @throws IOException
     * @throws OperationFailedException
    */

	public static String imageResize(String inPath, String inFileName, String outPath, String outFileName, String imageFlag, int width, int height) throws InterruptedException, IOException {

		String outputFile = "";

		Image frameBackImg = (new ImageIcon((new StringBuilder(inPath)).append(inFileName).toString())).getImage();

        BufferedImage bi = new BufferedImage(width, height, BufferedImage.TYPE_INT_ARGB);
        Graphics2D g2 = bi.createGraphics();
        g2.setColor(Color.WHITE);
        g2.fillRect(0, 0, width, height);
        Image reImg = frameBackImg.getScaledInstance(width, height, 4);
        int pixels[] = new int[width * height];
        PixelGrabber pg = new PixelGrabber(reImg, 0, 0, width, height, pixels, 0, width);
        pg.grabPixels();
        BufferedImage rebi = new BufferedImage(width, height, BufferedImage.TYPE_INT_ARGB_PRE);
        rebi.setRGB(0, 0, width, height, pixels, 0, width);
        g2.drawImage(rebi, 0, 0, null);
        g2.dispose();
        
        String name = outFileName.substring(0, outFileName.lastIndexOf("."));
		String ext = outFileName.substring(outFileName.lastIndexOf(".") + 1);
		if (imageFlag != null && !imageFlag.equals(""))
			outFileName = (new StringBuilder(String.valueOf(name))).append("_").append(imageFlag).append(".").append(ext).toString();
		ext="png";
		
		ImageIO.write(rebi, ext, new File((new StringBuilder(String.valueOf(outPath))).append(outFileName).toString()));
		//outputFile = ImageUtil.createImageFile(bi, reImg outFileName, ext, outPath);

		return outputFile;
	}

   
}
