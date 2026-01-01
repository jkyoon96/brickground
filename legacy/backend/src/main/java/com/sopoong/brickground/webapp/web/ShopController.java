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
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sopoong.brickground.webapp.domain.Cart;
import com.sopoong.brickground.webapp.domain.Delivery;
import com.sopoong.brickground.webapp.domain.Faq;
import com.sopoong.brickground.webapp.domain.Notice;
import com.sopoong.brickground.webapp.domain.OrderSummary;
import com.sopoong.brickground.webapp.domain.Product;
import com.sopoong.brickground.webapp.domain.Qna;
import com.sopoong.brickground.webapp.domain.Shop;
import com.sopoong.brickground.webapp.domain.User;
import com.sopoong.brickground.webapp.domain.VrMall;
import com.sopoong.brickground.webapp.domain.VrMallService;
import com.sopoong.brickground.webapp.domain.VrModel;

@CrossOrigin("*")
@RestController
public class ShopController {
	
	@Autowired
	private VrMallService vrMallService;
	  
	  
	@GetMapping(value = "/lianmall")		
	public String index() {
		
		return "/lianmall/index.html";
			
	}
	
	@GetMapping(value = "/lianmall/index")		
	public String indexEx() {
		return "/lianmall/index.html";
			
	}
	
	
	@RequestMapping(value="/shops.do", method= RequestMethod.GET)
	public ResponseEntity<List<Shop>> getProducts(@RequestParam(value = "page") int page, @RequestParam(value = "size") int size) {
		
		List<Shop> shops = vrMallService.findShop(page, size);
		return new ResponseEntity<List<Shop>>(shops, HttpStatus.OK);
	}
	      
}
