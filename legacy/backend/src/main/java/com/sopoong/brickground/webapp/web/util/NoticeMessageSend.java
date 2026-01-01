package com.sopoong.brickground.webapp.web.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

public class NoticeMessageSend {

	final static private String FCM_URL = "https://fcm.googleapis.com/fcm/send";
	final static private String SERVER_KEY = "AAAAwbOk7go:APA91bH0njcgeJVJN9guUHtiWZK-J8FfJx0WOt8VVa4pBCqJdi59LJNemQW0_MVY8kV9JfATUpNrxpDIfpA4y-D0gMk3Zbqz7vQbaLmFg8tkJjUhexi6wa5fZ5osPQ7CJ6qcMSjz1cdy";



	/**
	* 
	* Method to send push notification to Android FireBased Cloud messaging Server.
	* 
	* @param tokenId Generated and provided from Android Client Developer
	* @param server_key Key which is Generated in FCM Server 
	* @param message which contains actual information.
	* 
	*/

	static public void send(String tokenId, int commandId, String message){

		try{
			// Create URL instance.
			URL url = new URL(FCM_URL);

			// create connection.
			HttpURLConnection conn;
			conn = (HttpURLConnection) url.openConnection();
			conn.setUseCaches(false);
			conn.setDoInput(true);
			conn.setDoOutput(true);

			//set method as POST or GET
			conn.setRequestMethod("POST");

			//pass FCM server key
			conn.setRequestProperty("Authorization","key="+SERVER_KEY);

			//Specify Message Format
			conn.setRequestProperty("Content-Type","application/json");

			/*
			//Create JSON Object & pass value
			JSONObject infoJson = new JSONObject();
			infoJson.put("title","돌봄서비스 알림메시지입니다.");
			infoJson.put("body", message);

			JSONObject json = new JSONObject();
			json.put("to",tokenId.trim());
			json.put("notification", infoJson);
			*/
			
			JSONObject infoJson = new JSONObject();
			infoJson.put("title","브릭그라운드 주문 알림메시지입니다.");		
			infoJson.put("body", message);
			
			JSONObject json = new JSONObject();
			json.put("to",tokenId.trim());
			json.put("notification", infoJson);
			
			OutputStreamWriter wr = new OutputStreamWriter(conn.getOutputStream());
			wr.write(json.toString());
			wr.flush();

			int status = 0;
			if( null != conn ){
				status = conn.getResponseCode();
			}

			if( status != 0){
				if( status == 200 ){

					//SUCCESS message
					BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream()));
					System.out.println("Android Notification Response : " + reader.readLine());
					
				}else if(status == 401){

					//client side error
					System.out.println("Notification Response : TokenId : " + tokenId + " Error occurred :");

				}else if(status == 501){

					//server side error
					System.out.println("Notification Response : [ errorCode=ServerError ] TokenId : " + tokenId);

				}else if( status == 503){

					//server side error
					System.out.println("Notification Response : FCM Service is Unavailable  TokenId : " + tokenId);

				}
			}

		}catch(MalformedURLException mlfexception){

			// Prototcal Error
			System.out.println("Error occurred while sending push Notification!.." + mlfexception.getMessage());

		}catch(IOException mlfexception){

			//URL problem
			System.out.println("Reading URL, Error occurred while sending push Notification!.." + mlfexception.getMessage());

		}catch(JSONException jsonexception){

			//Message format error
			System.out.println("Message Format, Error occurred while sending push Notification!.." + jsonexception.getMessage());

		}catch (Exception exception) {

			//General Error or exception.
			System.out.println("Error occurred while sending push Notification!.." + exception.getMessage());

		}

	}

}
