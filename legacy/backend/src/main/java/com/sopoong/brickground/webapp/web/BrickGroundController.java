package com.sopoong.brickground.webapp.web;


import static java.util.stream.Collectors.toList;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import com.sopoong.brickground.webapp.domain.Cart;
import com.sopoong.brickground.webapp.domain.Delivery;
import com.sopoong.brickground.webapp.domain.DeliveryPolicy;
import com.sopoong.brickground.webapp.domain.Faq;
import com.sopoong.brickground.webapp.domain.Notice;
import com.sopoong.brickground.webapp.domain.OrderSummary;
import com.sopoong.brickground.webapp.domain.Product;
import com.sopoong.brickground.webapp.domain.Qna;
import com.sopoong.brickground.webapp.domain.User;
import com.sopoong.brickground.webapp.domain.VrMall;
import com.sopoong.brickground.webapp.domain.VrMallService;
import com.sopoong.brickground.webapp.domain.VrMallUserRole;
import com.sopoong.brickground.webapp.domain.VrModel;
import com.sopoong.brickground.webapp.domain.creation.Creation;
import com.sopoong.brickground.webapp.domain.creation.CreationBlacklist;
import com.sopoong.brickground.webapp.domain.creation.CreationComment;
import com.sopoong.brickground.webapp.domain.creation.CreationCommentReply;
import com.sopoong.brickground.webapp.domain.creation.CreationLike;
import com.sopoong.brickground.webapp.domain.creation.CreationService;
import com.sopoong.brickground.webapp.web.util.KakaoAPI;
import com.sopoong.brickground.webapp.web.util.MailSender;
import com.sopoong.brickground.webapp.web.util.NoticeMessageSend;
import com.sopoong.brickground.webapp.web.util.VRMallCommandId;


@CrossOrigin("*")
@RestController
@RequestMapping(value="/brickground")
public class BrickGroundController {
	
  private final Logger logger = LoggerFactory.getLogger(BrickGroundController.class);
	

  @Autowired
  private VrMallService vrMallService;
  
  @Autowired
  private CreationService creationService;
  

  @Autowired
  private MailSender mailSender;
  
  
/*	
  	@RequestMapping(value = "")		
	public String index() {
		return "/lianmall/index";
		
	}
  

	@RequestMapping(value = "/main")		
	public String main() {
		return "/lianmall/index.html";
		
	}
	
	@RequestMapping(value = "/products")		
	public String products() {
		return "/lianmall/index.html";
		
	}
	
	@RequestMapping(value = "/product/*")		
	public String product() {
		return "/lianmall/index.html";
		
	}
	
	@RequestMapping(value = "/vrmalls")		
	public String vrmalls() {
		return "/lianmall/index.html";
		
	}
	
	@RequestMapping(value = "/lvrmall/view/*")		
	public String vrmall() {
		return "/lianmall/index.html";
		
	}
	
	@RequestMapping(value = "/cart")		
	public String cart() {
		return "/lianmall/index.html";
		
	}
*/
  @RequestMapping(value="/products.do", method= RequestMethod.GET)
  public ResponseEntity<List<Product>> getProducts(@RequestParam(value = "shopId") Long shopId, @RequestParam(value = "page") int page, @RequestParam(value = "size") int size) {
	
	List<Product> products = vrMallService.findProductsByShopId(shopId, page, size);
    return new ResponseEntity<List<Product>>(products, HttpStatus.OK);
  }
  
  @RequestMapping(value="/productsBySearch.do", method= RequestMethod.GET)
  public ResponseEntity<List<Product>> getProductsBySearch(@RequestParam(value = "shopId") Long shopId, @RequestParam(value = "keyword") String keyword,
		  @RequestParam(value = "page") int page, @RequestParam(value = "size") int size) {
	
	List<Product> products = vrMallService.findProductsBySearch(shopId, keyword, page, size);
    return new ResponseEntity<List<Product>>(products, HttpStatus.OK);
  }
  
  
  @RequestMapping(value="/productsByCategory.do", method= RequestMethod.GET)
  public ResponseEntity<List<Product>> getProductsByCategroy(@RequestParam(value = "shopId") Long shopId, 
		  @RequestParam(value = "categoryList") String categoryList, 
		  @RequestParam(value = "page") int page, @RequestParam(value = "size") int size) {
	
	List<Product> products = vrMallService.findProductsByCategory(shopId, categoryList, page, size);
    return new ResponseEntity<List<Product>>(products, HttpStatus.OK);
  }
  
  
  @RequestMapping(value="/product.do", method= RequestMethod.POST)
  public ProductResponse createProduct(@RequestBody Product request) {
	  
	/*
	Product product = new Product();
	
	product.setShopId(request.getShopId());
	product.setProductName(request.getProductName());
	product.setProductFullName(request.getProductFullName());
	product.setCategoryId(request.getCategoryId());
	product.setPrice(request.getPrice());
	product.setCoverImage(request.getCoverImage());
	product.setDescription(request.getDescription());
	product.setProductSetName(request.getProductSetName());
	product.setLevelId(request.getLevelId());
	product.setVisible(request.getVisible());
	product.setVrModelName(request.getVrModelName());
	product.setRemainder(request.getRemainder());
	*/
    Product result = vrMallService.createProduct(request);
    return new ProductResponse(result);
  }
  
  @RequestMapping(value="/productUpdate.do", method= RequestMethod.POST)
  public ProductResponse updateProduct(@RequestBody Product request) {
	  
    Product result = vrMallService.updateProduct(request);
    return new ProductResponse(result);
  }
  

  @RequestMapping(value="/product.do", method= RequestMethod.GET)
  public ResponseEntity<ProductResponse> getProduct(@RequestParam(value = "productId") Long productId) {
	  
    return vrMallService.findProductById(productId)
            .map(product -> new ResponseEntity<>(new ProductResponse(product), HttpStatus.OK))
            .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
  }
  
  
  @RequestMapping(value="/productCountByShopId.do",  method= RequestMethod.GET)
  public ResponseEntity<Long> countProductByShopId(@RequestParam(value = "shopId") Long shopId) {
	  
    long productCount = vrMallService.countProductByShopId(shopId);
    
    return new ResponseEntity<Long>(productCount, HttpStatus.OK);

  }
  
  
  @RequestMapping(value="/manualsByManualsByProuductSetAndLevel.do", method= RequestMethod.GET)
  public ResponseEntity<List<Product>> getManualsByProuductSetAndLevel(@RequestParam(value = "shopId") Long shopId, 
		  @RequestParam(value = "productSetList") String productSetList,
		  @RequestParam(value = "levelList") String levelList, 
		  @RequestParam(value = "page") int page, 
		  @RequestParam(value = "size") int size) {
	
	List<Product> manuals = vrMallService.findManualsByProuductSetAndLevel(shopId, productSetList, levelList, page, size);
	
	return new ResponseEntity<List<Product>>(manuals, HttpStatus.OK);
  }
  
  
  @RequestMapping(value="/manualCountByProuductSetNameAndLevel.do",  method= RequestMethod.GET)
  public ResponseEntity<Long> countManualByProuductSetNameAndLevel(@RequestParam(value = "shopId") Long shopId, 
		@RequestParam(value = "productSetList") String productSetList,
		@RequestParam(value = "levelList") String levelList) {
	  
    long manualCount = vrMallService.countManualByProuductSetAndLevel(shopId, productSetList, levelList);
    
    return new ResponseEntity<Long>(manualCount, HttpStatus.OK);

  }
  
  @RequestMapping(value="/productsByCategoryAndSubject.do", method= RequestMethod.GET)
  public ResponseEntity<List<Product>> getProductsByCategoryAndSubject(
		  @RequestParam(value = "categoryList") String categoryList,
		  @RequestParam(value = "subjectList") String subjectList, 
		  @RequestParam(value = "page") int page, 
		  @RequestParam(value = "size") int size) {
	
	List<Product> manuals = vrMallService.findProductsByCategoryAndSubject(categoryList, subjectList, page, size);
	
	return new ResponseEntity<List<Product>>(manuals, HttpStatus.OK);
  }
  
  
  @RequestMapping(value="/productCountByCategoryAndSubject.do",  method= RequestMethod.GET)
  public ResponseEntity<Long> countProductByCategoryAndSubject(
		  @RequestParam(value = "categoryList") String categoryList,
		  @RequestParam(value = "subjectList") String subjectList) {
	  
    long manualCount = vrMallService.countProductByCategoryAndSubject(categoryList, subjectList);
    
    return new ResponseEntity<Long>(manualCount, HttpStatus.OK);

  }
  
  
  //////////////////////////////////////
  // VrMall
  //////////////////////////////////
  @RequestMapping(value="/vrMalls.do", method= RequestMethod.GET)
  public ResponseEntity<List<VrMall>> getVrMalls(@RequestParam(value = "shopId") Long shopId, @RequestParam(value = "page") int page, @RequestParam(value = "size") int size) {
	
	List<VrMall> vrMalls = vrMallService.findVrMallByShopId(shopId, page, size);
    return new ResponseEntity<List<VrMall>>(vrMalls, HttpStatus.OK);
  }
  
  @RequestMapping(value="/vrMallsByCategory.do", method= RequestMethod.GET)
  public ResponseEntity<List<VrMall>> getVrMallsByCategory(@RequestParam(value = "shopId") Long shopId, @RequestParam(value = "categoryList") String categoryList, @RequestParam(value = "page") int page, @RequestParam(value = "size") int size) {
	
	List<VrMall> vrMalls = vrMallService.findVrMallByCategory(shopId, categoryList, page, size);
    return new ResponseEntity<List<VrMall>>(vrMalls, HttpStatus.OK);
  }
  
  @RequestMapping(value="/vrMallCountByCategory.do", method= RequestMethod.GET)
  public ResponseEntity<Long> getVrMallCountByCategory(@RequestParam(value = "shopId") Long shopId, @RequestParam(value = "categoryList") String categoryList) {
	
	long vrMallCount = vrMallService.countVrMallByCategory(shopId, categoryList);
	return new ResponseEntity<Long>(vrMallCount, HttpStatus.OK);
  }
  
  
  @RequestMapping(value="/vrMallsByProductAndCategory.do", method= RequestMethod.GET)
  public ResponseEntity<List<VrMall>> getVrMallsByProductAndCategory(@RequestParam(value = "shopId") Long shopId, 
		  @RequestParam(value = "productList") String productList,
		  @RequestParam(value = "categoryList") String categoryList, 
		  @RequestParam(value = "page") int page,
		  @RequestParam(value = "size") int size) {
	
	List<VrMall> vrMalls = vrMallService.findVrMallByProductAndCategory(shopId, productList, categoryList, page, size);
	
    return new ResponseEntity<List<VrMall>>(vrMalls, HttpStatus.OK);
  }
  
  
  @RequestMapping(value="/vrMallCountByProuductAndCatetory.do",  method= RequestMethod.GET)
  public ResponseEntity<Long> countVrMallByProuductAndCategory(@RequestParam(value = "shopId") Long shopId, 
		@RequestParam(value = "productList") String productList,
		@RequestParam(value = "categoryList") String categoryList) {
	  
    long vrMallCount = vrMallService.countVrMallByProductAndCategory(shopId, productList, categoryList);
    
    return new ResponseEntity<Long>(vrMallCount, HttpStatus.OK);

  }
 
  
  @RequestMapping(value="/vrMallsBySearch.do", method= RequestMethod.GET)
  public ResponseEntity<List<VrMall>> getVrMallsBySearch(@RequestParam(value = "shopId") Long shopId, @RequestParam(value = "keyword") String keyword,
		  @RequestParam(value = "page") int page, @RequestParam(value = "size") int size) {
	
	List<VrMall> vrMalls = vrMallService.findVrMallBySearch(shopId, keyword, page, size);
    return new ResponseEntity<List<VrMall>>(vrMalls, HttpStatus.OK);
  }
  
  @RequestMapping(value="/vrMallsByUser.do", method= RequestMethod.GET)
  public ResponseEntity<List<ProductResponse>> getVrMallsByUser(@RequestParam(value = "userId") Long userId) {
	
	List<VrMallUserRole> vrMallUserRoles = vrMallService.findVrMallUserRoleByUserId(userId);
		
	List<ProductResponse> products = new ArrayList<ProductResponse>();
	
	vrMallUserRoles.forEach(vrMallUserRole -> {
		Optional<Product> productOp = vrMallService.findProductById(vrMallUserRole.getProductId());
		
		if(productOp.isPresent()) {
			
			ProductResponse productResponse = new ProductResponse(productOp.get(), vrMallUserRole);
			products.add(productResponse);
		}
	});
	
	
	return new ResponseEntity<List<ProductResponse>>(products, HttpStatus.OK);
  }
  
  @RequestMapping(value="/vrMall.do", method= RequestMethod.POST)
  public VrMallResponse createVrMall(@RequestBody VrMallRequest request) {
	  
	VrMall vrMall = new VrMall();
	vrMall.setShopId(request.getShopId());
	
	vrMall.setVrMallName(request.getVrMallName());
	vrMall.setCategoryId(request.getCategoryId());
	vrMall.setVisible(request.getVisible());
	vrMall.setIntroImage(request.getIntroImage());
	vrMall.setCoverImage(request.getCoverImage());
	vrMall.setVideoImage(request.getVideoImage());
	vrMall.setVideoData(request.getVideoData());
	vrMall.setManualData(request.getManualData());
	vrMall.setProgramData(request.getProgramData());
	vrMall.setSetNames(request.getSetNames());
	vrMall.setDescription(request.getDescription());
			
    VrMall result = vrMallService.createVrMall(vrMall);
    return new VrMallResponse(result);
  }
  
  
  @RequestMapping(value="/vrMallUpdate.do", method= RequestMethod.POST)
  public VrMallResponse updateVrMall(@RequestBody VrMallRequest request) {
	  
	VrMall vrMall = new VrMall();
	vrMall.setVrMallId(request.getVrMallId());
	vrMall.setShopId(request.getShopId());
	vrMall.setVrMallName(request.getVrMallName());
	vrMall.setCategoryId(request.getCategoryId());
	vrMall.setVisible(request.getVisible());
	vrMall.setIntroImage(request.getIntroImage());
	vrMall.setCoverImage(request.getCoverImage());
	vrMall.setVideoImage(request.getVideoImage());
	vrMall.setVideoData(request.getVideoData());
	vrMall.setManualData(request.getManualData());
	vrMall.setProgramData(request.getProgramData());
	vrMall.setSetNames(request.getSetNames());
	vrMall.setDescription(request.getDescription());
			
    VrMall result = vrMallService.updateVrMall(vrMall);
    return new VrMallResponse(result);
  }
  
  
  @RequestMapping(value="/vrMallCopy.do", method= RequestMethod.POST)
  public VrMallResponse copyVrMall(@RequestBody VrMallRequest request) {
	  
	VrMall vrMall = new VrMall();
	vrMall.setVrMallId(request.getVrMallId());
	
    VrMall result = vrMallService.copyVrMall(vrMall);
    return new VrMallResponse(result);
  }
  
  
  @RequestMapping(value="/vrMallDelete.do", method= RequestMethod.POST)
  public VrMallResponse deleteVrMall(@RequestBody VrMallRequest request) {
	  
	VrMall vrMall = new VrMall();
	vrMall.setVrMallId(request.getVrMallId());
	
    VrMall result = vrMallService.deleteVrMall(vrMall);
    return new VrMallResponse(result);
  }
  
  
  @RequestMapping(value="/vrMallAssetUpdate.do", method= RequestMethod.POST)
  public VrMallResponse updateVrMallAssets(@RequestBody VrMallRequest request) {
  //public VrMallResponse updateVrMallAssets(HttpServletRequest request, HttpServletResponse response) {
	  
	JSONParser jsonParser = new JSONParser(); 
	//JSONObject jsonObject = (JSONObject) jsonParser.parse(request.get); 
	
	ObjectMapper mapper = new ObjectMapper();

	String vrModelsStr = null;
	try {
		vrModelsStr = mapper.writeValueAsString(request.getVrModels());
		
		System.out.println("vrModels : " + vrModelsStr);
		
	} catch (JsonProcessingException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}

	VrMall result = vrMallService.updateVrMallAsset(request.getVrMallId(), vrModelsStr);
	return new VrMallResponse(result);
  }
  

  @RequestMapping(value="/vrMall.do", method= RequestMethod.GET)
  public ResponseEntity<VrMallResponse> getVrMall(@RequestParam(value = "vrMallId") Long vrMallId) {
	  
    return vrMallService.findVrMallById(vrMallId)
            .map(vrMall -> new ResponseEntity<>(new VrMallResponse(vrMall), HttpStatus.OK))
            .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
  }
  
  

	//////////////////////////////////////
	// VrMall User Role
	//////////////////////////////////

	@RequestMapping(value="/vrMallUserRole.do", method= RequestMethod.GET)
	public ResponseEntity<List<VrMallUserRole>> getClassUserRoles(@RequestParam(value = "userId") Long userId, @RequestParam(value = "page") int page, @RequestParam(value = "size") int size) {
		
		List<VrMallUserRole> vrMallUserRoles = vrMallService.findVrMallUserRoleByUserId(userId);
		
		return new ResponseEntity<List<VrMallUserRole>>(vrMallUserRoles, HttpStatus.OK);
	}
	
	@RequestMapping(value="/vrMallUserRole.do", method= RequestMethod.POST)
	public VrMallUserRole createVrMallUserRole(@RequestBody VrMallUserRole request) {
		  
		VrMallUserRole result = vrMallService.createVrMallUserRole(request);
		return result;
	}
	   
	@RequestMapping(value="/vrMallUserRoleUpdate.do",  method= RequestMethod.POST)
	public VrMallUserRole updateClassUserRole(@RequestBody VrMallUserRole request) {
		  
		VrMallUserRole result = vrMallService.updateVrMallUserRole(request);
		    
		return result;
	}
	
	@RequestMapping(value="/vrMallUserRoleDelete.do",  method= RequestMethod.POST)
	public VrMallUserRole deleteClassUserRole(@RequestBody VrMallUserRole request) {
		  
		vrMallService.deleteVrMallUserRole(request);
		    
		return request;
	}
	
	
  
  
  //////////////////////////////////////
  // VrModels
  //////////////////////////////////
  @RequestMapping(value="/vrModels.do", method= RequestMethod.GET)
  public ResponseEntity<List<VrModel>> getVrModels(@RequestParam(value = "shopId") Long shopId) {
	
	List<VrModel> vrModels = vrMallService.findVrModelByShopId(shopId);
    return new ResponseEntity<List<VrModel>>(vrModels, HttpStatus.OK);
  }
  
  @RequestMapping(value="/vrModelsBySetName.do", method= RequestMethod.GET)
  public ResponseEntity<List<VrModel>> getVrModelsBySetName(@RequestParam(value = "setName") String setName) {
	
	List<VrModel> vrModels = vrMallService.findVrModelBySetName(setName);
    return new ResponseEntity<List<VrModel>>(vrModels, HttpStatus.OK);
  }
  
  @RequestMapping(value="/vrModelsBySetNames.do", method= RequestMethod.GET)
  public ResponseEntity<List<VrModel>> getVrModelsBySetNames(@RequestParam(value = "setNames") String setNames) {
	
	List<VrModel> vrModels = vrMallService.findVrModelBySetNames(setNames);
    return new ResponseEntity<List<VrModel>>(vrModels, HttpStatus.OK);
  }
  
  
  @RequestMapping(value="/vrModel.do", method= RequestMethod.POST)
  public ResponseEntity<VrModel> createVrModel(@RequestBody VrModel request) {
	  
    VrModel result = vrMallService.createVrModel(request.getShopId(), request.getVrModelType(), request.getVrModelName(), request.getModelPath(), 
    											request.getMaterial(), request.getNormalMap(), request.getTexture(), request.getClickable());
    return new ResponseEntity<VrModel>(result, HttpStatus.OK);
  }
  
   
  
  //////////////////////////////////////
  // Carts
  //////////////////////////////////
  @RequestMapping(value="/cartsByUser.do", method= RequestMethod.GET)
  public ResponseEntity<List<Cart>> getCartsByUser(@RequestParam(value = "shopId") Long shopId, @RequestParam(value = "userId") Long userId) {
  	
	List<Cart> carts = vrMallService.findCartsByUserId(shopId, userId);
    return new ResponseEntity<List<Cart>>(carts, HttpStatus.OK);
  }
  
  
  @RequestMapping(value="/cart.do", method= RequestMethod.POST)
  public Cart updateCart(@RequestBody Cart request) {
	  
	System.out.println("updateCart request  : " + request);
	Cart result = vrMallService.updateCartById(request);
    
    return result;
	    
  }
  
  @RequestMapping(value="/carts.do", method= RequestMethod.POST)
  public ResponseEntity<List<Cart>> updateCarts(@RequestBody List<Cart> request) {
	  
	System.out.println("updateCarts request  : " + request);
	List<Cart> result = vrMallService.updateCarts(request);
    
	return new ResponseEntity<List<Cart>>(result, HttpStatus.OK);
	    
  }
  
  @RequestMapping(value="/cartUpdateCount.do", method= RequestMethod.POST)
  public Cart updateCartCount(@RequestBody Cart request) {
	  
	System.out.println("deleteCart request  : " + request);
	Cart result = vrMallService.updateCartCount(request);
    
    return result;
	    
  }
  
  
  @RequestMapping(value="/cartDelete.do", method= RequestMethod.POST)
  public Cart deleteCart(@RequestBody Cart request) {
	  
	System.out.println("deleteCart request  : " + request);
	Cart result = vrMallService.deleteCartById(request);
    
    return result;
	    
  }
  
  @RequestMapping(value="/cartsDelete.do", method= RequestMethod.POST)
  public ResponseEntity<List<Cart>> deleteCarts(@RequestBody List<Cart> request) {
	  
	System.out.println("deleteCarts request  : " + request);
	List<Cart> result = vrMallService.deleteCarts(request);
    
	return new ResponseEntity<List<Cart>>(result, HttpStatus.OK);
	    
  }
    
  
  
  //////////////////////////////////////
  // Orders
  //////////////////////////////////
  @RequestMapping(value="/ordersByUser.do", method= RequestMethod.GET)
  public ResponseEntity<List<OrderSummary>> getOrderSummarysByUser(@RequestParam(value = "userId") Long userId, @RequestParam(value = "page") int page, @RequestParam(value = "size") int size) {
	  
	List<OrderSummary> orderSummarys = vrMallService.findOrdersByUserId(userId, page, size);
    return new ResponseEntity<List<OrderSummary>>(orderSummarys, HttpStatus.OK);
  }
  
  @RequestMapping(value="/ordersById.do", method= RequestMethod.GET)
  public OrderSummary getOrderSummarysById(@RequestParam(value = "orderSummaryId") Long orderSummaryId) {
	  
	Optional<OrderSummary> orderSummary = vrMallService.findOrdersById(orderSummaryId);
	
	if(orderSummary.isPresent()) {
		return orderSummary.get();
	}
    return new OrderSummary();
  }
  
  @RequestMapping(value="/ordersByShop.do", method= RequestMethod.GET)
  public ResponseEntity<List<OrderSummary>> getOrderSummarysByShop(@RequestParam(value = "shopId") Long shopId, @RequestParam(value = "page") int page, @RequestParam(value = "size") int size) {
	  
	List<OrderSummary> orderSummarys = vrMallService.findOrdersByShopId(shopId, page, size);
    return new ResponseEntity<List<OrderSummary>>(orderSummarys, HttpStatus.OK);
  }
  
  
  @RequestMapping(value="/orderSummary.do", method= RequestMethod.POST)
  public OrderSummary createOrderSummary(@RequestBody OrderSummary request) {
	  
	System.out.println("createOrderSummary request  : " + request);
    OrderSummary result = vrMallService.createOrderSummary(request);
    
    
    List<User> users= vrMallService.findUserByFirebaseId();
    
     
    Map<String, Object> requestParams = new HashMap<String, Object>();
	
	requestParams.put("header", "구매신청이 도착했습니다.");
	requestParams.put("price", request.getTotalPrice());
	
	//String message = "주문가격 : " + request.getTotalPrice() + "\n";
	//message += "상품건수 : " + request.getOrderCount()  + "\n";
	//message += "주문시간 : " + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
	
	String message = "주문시간 : " + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
	message += " 지금 확인해 보세요!";
		
	for(User user : users) {
		NoticeMessageSend.send(user.getFirebaseId(), VRMallCommandId.COMMAND_ID_INSERT_ORDER, message);
		//mailSender.sendMail("jkyoon@gosopoong.co.kr", "구매신청이 도착했습니다", message);
		mailSender.sendMail(user.getEmail(), "구매신청이 도착했습니다", message);
	}
	
    return result;
	    
  }
  
  
  @RequestMapping(value = {"/orderSummaryByMobile.do"}, method = {RequestMethod.POST})
  public OrderSummary createOrderSummaryByMobile(@RequestBody OrderSummary request) {
    System.out.println("createOrderSummary request  : " + request);
    OrderSummary result = this.vrMallService.createOrderSummary(request);
    return result;
  }
  
  
  @RequestMapping(value = {"/orderSummaryUpdateByMobile.do"}, method = {RequestMethod.POST})
  public OrderSummary updateOrderSummaryByMobile(@RequestBody OrderSummary request) {
    System.out.println("updateOrderSummaryByMobile request  : " + request);
    RestTemplate restTemplate = new RestTemplate();
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);
    JSONObject body = new JSONObject();
    body.put("imp_key", "3390582956222094");
    body.put("imp_secret", "k2bbsAfQUeTu29tBKKPXLNq2jNgqbbkvewHG6Wx1aqwcA0NlKDivqIxJwOaH0ude1UV8Rs91TFetF2Op");
    try {
      HttpEntity<JSONObject> entity = new HttpEntity(body, (MultiValueMap)headers);
      ResponseEntity<JSONObject> response = restTemplate.postForEntity("https://api.iamport.kr/users/getToken", entity, JSONObject.class, new Object[0]);
      String token = ((JSONObject)response.getBody()).get("response").toString();
      this.logger.debug("token  : " + token);
      JSONParser parser = new JSONParser();
      JSONObject accessToken = (JSONObject)parser.parse(token);
      this.logger.debug("accessToken  : " + accessToken.get("access_token").toString());
      headers.clear();
      headers.add("Authorization", accessToken.get("access_token").toString());
      entity = new HttpEntity((MultiValueMap)headers);
      response = restTemplate.exchange("https://api.iamport.kr/payments/" + request.getImpUid(), HttpMethod.GET, entity, JSONObject.class, new Object[0]);
      this.logger.debug("payment   : " + ((JSONObject)response.getBody()).get("response").toString());
      JSONObject payment = (JSONObject)parser.parse(((JSONObject)response.getBody()).get("response").toString());
      request.setApplyNumber(payment.get("apply_num").toString());
    } catch (Exception e) {
      this.logger.debug("orderSummaryUpdateByMobile failed  : " + e);
    } 
    OrderSummary result = this.vrMallService.updateOrderSummaryImpUid(request);
    List<User> users = this.vrMallService.findUserByFirebaseId();
    String message = "주문시간: " + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
    message = message + " 지금 확인해 보세요!" ;
    for (User user : users) {
      NoticeMessageSend.send(user.getFirebaseId(), 1001, message);
      this.mailSender.sendMail(user.getEmail(), "구매신청이 도착했습니다", message);
    } 
    return result;
  }
  
  
  @RequestMapping(value="/orderSummaryUpdate.do", method= RequestMethod.POST)
  public OrderSummary orderSummaryUpdate(@RequestBody OrderSummary request) {
	  
	System.out.println("orderSummaryUpdate request  : " + request);
    OrderSummary result = vrMallService.updateOrderSummaryDeliveryState(request);
    
    return result;
	    
  }
  
  @RequestMapping(value="/orderSummaryCountByShopId.do",  method= RequestMethod.GET)
  public ResponseEntity<Long> countOrderSummaryByShopId(@RequestParam(value = "shopId") Long shopId) {
	  
    long orderSummaryCount = vrMallService.countOrderSummaryByShopId(shopId);
    
    return new ResponseEntity<Long>(orderSummaryCount, HttpStatus.OK);

  }
  
  @RequestMapping(value="/orderSummaryCountByUserId.do",  method= RequestMethod.GET)
  public ResponseEntity<Long> countOrderSummaryByUserId(@RequestParam(value = "userId") Long userId) {
	  
    long orderSummaryCount = vrMallService.countOrderSummaryByUserId(userId);
    
    return new ResponseEntity<Long>(orderSummaryCount, HttpStatus.OK);

  }
   

  
  //////////////////////////////////////
  // Delivery
  //////////////////////////////////
  @RequestMapping(value="/deliverys.do", method= RequestMethod.GET)
  public ResponseEntity<List<Delivery>> getDeliverys(@RequestParam(value = "userId") Long userId) {
	
	List<Delivery> deliverys = vrMallService.findDeliverysByUserId(userId);
    return new ResponseEntity<List<Delivery>>(deliverys, HttpStatus.OK);
  }
  
  @RequestMapping(value="/delivery.do", method= RequestMethod.POST)
  public DeliveryResponse createDelivery(@RequestBody DeliveryRequest request) {
	  
	Optional<Delivery> deliveryOp = vrMallService.findDeliveryByAdderess(request.getAddress(), request.getDetailAddress(), request.getPhone(), request.getEmail());
	
	if(deliveryOp.isPresent())
		return new DeliveryResponse(deliveryOp.get());
	
    Delivery result = vrMallService.createDelivry(request.getUserId(), request.getShopId(), request.getAreaNo(), request.getAddress(), 
    											request.getDetailAddress(), request.getZip(), request.getPhone(), request.getEmail());
    return new DeliveryResponse(result);
  }
  
  @RequestMapping(value="/deliveryInfo.do", method= RequestMethod.POST)
  public DeliveryResponse getDelivery(@RequestBody DeliveryRequest request) {
	  
	Optional<Delivery> result = vrMallService.findDeliveryById(request.getDeliveryId());
	
	if(result.isPresent()) {
		return new DeliveryResponse(result.get());
	}
		
	return new DeliveryResponse();		
  }
  
  @RequestMapping(value="/deliveryDelete.do", method= RequestMethod.POST)
  public ResponseEntity<List<Delivery>> deleteDelivery(@RequestBody Delivery request) {
	  
    vrMallService.deleteDelivery(request.getDeliveryId());
    List<Delivery> deliverys = vrMallService.findDeliverysByUserId(request.getUserId());
    
    return new ResponseEntity<List<Delivery>>(deliverys, HttpStatus.OK);

  }
  
  
  //////////////////////////////////////
  // DeliveryPolicy
  //////////////////////////////////
  @RequestMapping(value="/deliveryPolicy.do", method= RequestMethod.GET)
  public DeliveryPolicy getDeliveryPolicy(@RequestParam(value = "shopId") Long shopId) {
	
	  Optional<DeliveryPolicy> deliveryPolicy = vrMallService.findDeliveryPolicyByShopId(shopId);
		
	  if(deliveryPolicy.isPresent()) {
		  return deliveryPolicy.get();
	  }
			
	  return new DeliveryPolicy();	
  }
  
  
  @RequestMapping(value="/deliveryPolicyUpdate.do", method= RequestMethod.POST)
  public DeliveryPolicy updateDeliveryPolicy(@RequestBody DeliveryPolicy request) {
	
	  DeliveryPolicy deliveryPolicy = vrMallService.updateDeliveryPolicy(request);
		
	  if(deliveryPolicy != null) {
		  return deliveryPolicy;
	  }
			
	  return new DeliveryPolicy();	
  }
  
  
  //////////////////////////////////////
  // User
  //////////////////////////////////
  @RequestMapping(value="/usersByShopId.do", method= RequestMethod.GET)
  public ResponseEntity<List<User>> getUsers(@RequestParam(value = "shopId") Long shopId) {
	
	List<User> users = vrMallService.findUsersByShopId(shopId);
    return new ResponseEntity<List<User>>(users, HttpStatus.OK);
  }
  
  @RequestMapping(value="/usedEmailCheck.do", method= RequestMethod.POST)
  public LoginResponse checkUsedEmail(@RequestBody UserRequest request) {
	  
    User result = vrMallService.usedEmailCheck(request.getEmail());
    return new LoginResponse(result, null, 0);
    
  }
  
  @RequestMapping(value="/user.do", method= RequestMethod.POST)
  public UserResponse createUser(@RequestBody UserRequest request) {
	  
	int createMode = 0; //web
    User result = vrMallService.createUser(request.getShopId(),request.getUserName(), request.getUserNickname(), request.getPassword(), request.getEmail(), request.getMobile(), createMode);
    return new UserResponse(result);
    
  }
  
  @RequestMapping(value="/userInfo.do", method= RequestMethod.POST)
  public UserResponse getUser(@RequestBody UserRequest request) {
	  
	Optional<User> result = vrMallService.findUserById(request.getUserId());
	
	if(result.isPresent()) {
		return new UserResponse(result.get());
	}
		
	return new UserResponse();		
  }
  
  
  @RequestMapping(value="/login.do", method= RequestMethod.POST)
  public LoginResponse login(@RequestBody UserRequest request, HttpServletRequest httpServletRequest) {
	 
	
    User user = vrMallService.checkLogin(request.getEmail(), request.getPassword());
    

    if(user != null) {
    	
    	String remoteIp = WebSessionListener.getInstance().getRemoteIp(httpServletRequest);
    	int sessionCount = WebSessionListener.getInstance().getSessionCountByUserId(httpServletRequest, user.getUserId().toString());
    	
    	// 접근권한이 없는 IP에서 접속하였을 경우 
    	if(!user.getIpAddress().equals("0.0.0.0") && !user.getIpAddress().equals(remoteIp)) {
    			return new LoginResponse(null, null, -2);
    	}
    	

    	if( sessionCount < user.getMaxSession()) {
    	
	    	HttpSession httpSession = WebSessionListener.getInstance().setSession(httpServletRequest, user.getUserId());
	    	
	    	logger.debug(user.toString());
	    	
	    	return new LoginResponse(user, httpSession, 0);
    	}
    	else { // 실시간 접속 세션을 초과하였을 경우
    		
    		//return new LoginResponse(null, null, -3);
    		
    		HttpSession session = WebSessionListener.getInstance().setSession(httpServletRequest, user.getUserId());
	    	
	    	logger.debug(user.toString());
	    	
	    	return new LoginResponse(user, session, 0);
    	}

    	
    }

    // 계정 및 암호가 비정상적일 경우
    return new LoginResponse(null, null, -1);
    
  }
  
  
    @RequestMapping(value = "/logout.do")
	public @ResponseBody Map<Object, Object>  logout(@RequestParam Map<String, String> params, HttpServletRequest httpServletRequest) throws Exception {
	
		Map<Object, Object> result = new HashMap<Object, Object>();
		
		WebSessionListener.getInstance().removeSession(httpServletRequest, params.get("sessionId"));
		
		result.put("resultCode", 0);
		result.put("resultMsg", "로그아웃이 성공하였습니다.");
			
		return result;
	}
  
  
	@RequestMapping(value = "/mlogin.do")
	public @ResponseBody Map<Object, Object> checkLogin(@RequestParam Map<String, String> params, HttpServletRequest request) throws Exception {
	
		Map<Object, Object> result = new HashMap<Object, Object>();
		
		String email = params.get("email");
		String password = params.get("password");
		String firebaseId = params.get("firebaseId");
			
		User user = vrMallService.checkLogin(email, password);
		
		if(user != null) {
	    	
			if(firebaseId != null)
				vrMallService.updateUserFirebaseId(user.getUserId(), firebaseId);
			
			result.put("resultCode", 0);

			result.put("resultCode", 0);
			result.put("resultMsg", "로그인이 성공하였습니다.");
			
			result.put("email", user.getEmail());
			result.put("userName", user.getUserName());
			result.put("userId", user.getUserId());
			result.put("shopId", user.getShopId());
			
			return result;
			
	    } else {
			result.put("resultCode", -1);
			result.put("resultMsg", "로그인이 실패하였습니다.");
			
			return result;
		}
		
	}
	
	
	@RequestMapping(value = "/mlogout.do")
	public @ResponseBody Map<Object, Object>  mlogout(HttpServletRequest httpServletRequest) throws Exception {
	
		Map<Object, Object> result = new HashMap<Object, Object>();
		
		result.put("resultCode", 0);
		result.put("resultMsg", "로그아웃이 성공하였습니다.");
			
		return result;
	}
	
	@RequestMapping(value = "/klogin.do", method= RequestMethod.POST)
	public @ResponseBody Map<Object, Object> LoginByKakao(@RequestBody UserRequest request) throws Exception {
	
		Map<Object, Object> result = new HashMap<Object, Object>();
		
		String accessToken = request.getAccessToken();
		Long shopId = request.getShopId();
		
		HashMap<String, Object> userInfo = KakaoAPI.getUserInfo(accessToken);
			
		String email = userInfo.get("email").toString();
		String userName = userInfo.get("nickname").toString();
		
		User user = vrMallService.usedEmailCheck(email);
		
		if(user == null ) {
			
			int createMode = 1; // Kakao
			String mobile = "000-0000-0000";
			user = vrMallService.createUser(shopId,userName, userName, email, email, mobile, createMode);
			
		} else {
			
			if(user.getCreateMode() == 0) {
				result.put("resultCode", -1);
				result.put("resultMsg", "이미 이메일이 등록되어 있습니다.");
				
				return result;
			}
		}
		
		if(user != null) {
	    	
			result.put("resultCode", 0);

			result.put("resultCode", 0);
			result.put("resultMsg", "로그인이 성공했습니다.");
			
			result.put("email", user.getEmail());
			result.put("userName", user.getUserName());
			result.put("userId", user.getUserId());
			result.put("shopId", user.getShopId());
			
			return result;
			
	    } else {
	    	
			result.put("resultCode", -1);
			result.put("resultMsg", "로그인이 실패했습니다.");
			
			return result;
		}
		
	}
	
	
	@RequestMapping(value="/passwordUpdate.do", method= RequestMethod.POST)
	public UserResponse updatePassword(@RequestBody UserRequest request) {
		
		Optional<User> userOp = vrMallService.findUserById(request.getUserId());
		
		User user = null;
		if(userOp.isPresent()) {	
			
			user = userOp.get();
			
			user = vrMallService.checkLogin(user.getEmail(), request.getPassword());
			
			if(user != null) {
				user = vrMallService.updateUserPassword(request.getUserId(), request.getNewPassword());
				return new UserResponse(user);
			}
		} 
			
		return new UserResponse();
		
	}
	
	
	@RequestMapping(value="/passwordReset.do", method= RequestMethod.POST)
	public UserResponse resetPassword(@RequestBody UserRequest request) {
	
		Map<Object, Object> result = new HashMap<Object, Object>();
	  
		User user = vrMallService.usedEmailCheck(request.getEmail());
	
		if(user.getUserName().compareTo(request.getUserName()) != 0 ||
			user.getMobile().compareTo(request.getMobile()) != 0 ||
			user.getCreateMode() != 0 ) {
			return new UserResponse();
		}
		
		StringBuffer temp = new StringBuffer();
		Random rnd = new Random();
		for (int i = 0; i < 10; i++) {
		    int rIndex = rnd.nextInt(3);
		    switch (rIndex) {
		    case 0:
		        // a-z
		        temp.append((char) ((int) (rnd.nextInt(26)) + 97));
		        break;
		    case 1:
		        // A-Z
		        temp.append((char) ((int) (rnd.nextInt(26)) + 65));
		        break;
		    case 2:
		        // 0-9
		        temp.append((rnd.nextInt(10)));
		        break;
		    }
		}
		
		String password = temp.toString();
		password += "!";
		
		user = vrMallService.updateUserPassword(user.getUserId(), password);
		
		String message = "변경된 패스워드 : " + password;
		message += "\n 로그인 후 패스워드를 변경하세요.";
	
		mailSender.sendMail(request.getEmail(), "패스워드가 재설정 되었습니다.", message);

		return new UserResponse(user);
    
	}
	
	
	@RequestMapping(value="/pointAdd.do", method= RequestMethod.POST)
	public long pointAdd(@RequestParam(value = "userId") Long userId, @RequestParam(value = "bonusPoint") Long bonusPoint) {
			
		return vrMallService.addPoint(userId, bonusPoint);
		
	}
	
	
	@RequestMapping(value="/avatarUpdate.do", method= RequestMethod.GET)
	public long avatarUpdate(@RequestParam(value = "userId") Long userId, @RequestParam(value = "avatarModel") String avatarModel) {
			
		User user= vrMallService.updateAvatarModel(userId, avatarModel);
		
		if(user != null)
			return 1;
		
		return 0;
		
	}
	  

  //////////////////////////////////////
  // Notice
  //////////////////////////////////
  @RequestMapping(value="/notices.do", method= RequestMethod.GET)
  public ResponseEntity<List<Notice>> getNotices(@RequestParam(value = "shopId") Long shopId, @RequestParam(value = "page") int page, @RequestParam(value = "size") int size) {
	
	//List<Notice> notices = vrMallService.findNoticesByShopId(shopId);
	List<Notice> notices = vrMallService.findNotices(page, size);
    return new ResponseEntity<List<Notice>>(notices, HttpStatus.OK);
  }
  
  @RequestMapping(value="/notice.do", method= RequestMethod.POST)
  public Notice createNotice(@RequestBody Notice request) {
	  
    Notice result = vrMallService.createNotice(request.getUserId(), request.getShopId(), request.getNoticeType(), request.getNoticeTitle(),
    											request.getNoticeDescription());
    return result;
  }
  
  @RequestMapping(value="/noticeDelete.do", method= RequestMethod.POST)
  public ResponseEntity<List<Notice>> deleteNotice(@RequestBody Notice request) {
	  
    vrMallService.deleteNotice(request.getNoticeId());
    List<Notice> notices = vrMallService.findNoticesByShopId(request.getShopId());
    
    return new ResponseEntity<List<Notice>>(notices, HttpStatus.OK);

  }
  
  @RequestMapping(value="/noticeCount.do",  method= RequestMethod.GET)
  public ResponseEntity<Long> countNotice() {
	  
    long noticeCount = vrMallService.countNotice();
    
    return new ResponseEntity<Long>(noticeCount, HttpStatus.OK);

  }
    

  //////////////////////////////////////
  // Faq
  //////////////////////////////////
  @RequestMapping(value="/faqs.do", method= RequestMethod.GET)
  public ResponseEntity<List<Faq>> getFaqs(@RequestParam(value = "shopId") Long shopId, @RequestParam(value = "page") int page, @RequestParam(value = "size") int size) {
	
	//List<Faq> faqs = vrMallService.findFaqsByShopId(shopId);
	List<Faq> faqs = vrMallService.findFaqs(page, size);
    return new ResponseEntity<List<Faq>>(faqs, HttpStatus.OK);
  }
  
  @RequestMapping(value="/faq.do", method= RequestMethod.POST)
  public Faq createFaq(@RequestBody Faq request) {
	  
	  Faq result = vrMallService.createFaq(request.getUserId(), request.getShopId(), request.getFaqType(), request.getFaqTitle(),
    											request.getFaqDescription());
    return result;
  }
  
  @RequestMapping(value="/faqDelete.do", method= RequestMethod.POST)
  public ResponseEntity<List<Faq>> deleteFaq(@RequestBody Faq request) {
	  
    vrMallService.deleteFaq(request.getFaqId());
    List<Faq> faqs = vrMallService.findFaqsByShopId(request.getShopId());
    
    return new ResponseEntity<List<Faq>>(faqs, HttpStatus.OK);

  }
  
  @RequestMapping(value="/faqCount.do",  method= RequestMethod.GET)
  public ResponseEntity<Long> countFaq() {
	  
    long faqCount = vrMallService.countFaq();
    
    return new ResponseEntity<Long>(faqCount, HttpStatus.OK);

  }
  

  //////////////////////////////////////
  // Qna
  //////////////////////////////////
  @RequestMapping(value="/qnas.do", method= RequestMethod.GET)
  public ResponseEntity<List<Qna>> getQnas(@RequestParam(value = "shopId") Long shopId, @RequestParam(value = "userId") Long userId, @RequestParam(value = "page") int page, @RequestParam(value = "size") int size) {
	
	//List<Qna> faqs = vrMallService.findQnasByShopId(shopId, userId);
	List<Qna> faqs = vrMallService.findQnas(userId, page, size);
    return new ResponseEntity<List<Qna>>(faqs, HttpStatus.OK);
  }
  
  @RequestMapping(value="/qna.do", method= RequestMethod.POST)
  public Qna createQna(@RequestBody Qna request) {
	  
	  Qna result = vrMallService.createQna(request.getUserId(), request.getShopId(), request.getQnaType(), request.getQnaTitle(),
    											request.getQnaQuestion(), request.getQnaAnswer());
    return result;
  }
  
  @RequestMapping(value="/qnaAnswer.do", method= RequestMethod.POST)
  public Qna updateQna(@RequestBody Qna request) {
	  
	Qna result = vrMallService.updateQna(request.getQnaId(), request.getQnaAnswer());
	
    return result;
  }
  
  @RequestMapping(value="/qnaDelete.do", method= RequestMethod.POST)
  public ResponseEntity<List<Qna>> deleteQna(@RequestBody Qna request) {
	  
    vrMallService.deleteQna(request.getQnaId());
    List<Qna> qnas = vrMallService.findQnasByShopId(request.getShopId(), request.getUserId());
    
    return new ResponseEntity<List<Qna>>(qnas, HttpStatus.OK);

  } 
  
  @RequestMapping(value="/qnaCount.do",  method= RequestMethod.GET)
  public ResponseEntity<Long> countQna(@RequestParam(value = "userId") Long userId) {
	  
    long qnaCount = vrMallService.countQna(userId);
    
    return new ResponseEntity<Long>(qnaCount, HttpStatus.OK);

  }
  
  
  
  //////////////////////////////////////
  // Creation
  //////////////////////////////////
  
  @RequestMapping(value="/creations.do", method= RequestMethod.GET)
  public ResponseEntity<List<CreationResponse>> getCreations(@RequestParam(value = "shopId") Long shopId, @RequestParam(value = "page") int page, @RequestParam(value = "size") int size) {
	
	List<Creation> creations = creationService.findCreationByShopId(shopId, page, size);
	
	List<CreationResponse> creationResponses = new ArrayList<CreationResponse>();
	
	creations.forEach(creation -> {	
		CreationResponse creationResponse = new CreationResponse(creation,false);
		creationResponses.add(creationResponse);
	});
	
    return new ResponseEntity<List<CreationResponse>>(creationResponses, HttpStatus.OK);
  }
  
  @RequestMapping(value="/creationRemixs.do", method= RequestMethod.GET)
  public ResponseEntity<List<CreationResponse>> getCreationRemixs(@RequestParam(value = "rootId") Long rootId, @RequestParam(value = "page") int page, @RequestParam(value = "size") int size) {
	
	List<Creation> creations = creationService.findRemixCreation(rootId, page, size);
	
	List<CreationResponse> creationResponses = new ArrayList<CreationResponse>();
	
	creations.forEach(creation -> {	
		CreationResponse creationResponse = new CreationResponse(creation,false);
		creationResponses.add(creationResponse);
	});
	
    return new ResponseEntity<List<CreationResponse>>(creationResponses, HttpStatus.OK);
  }
  
  @RequestMapping(value="/creationsByCategory.do", method= RequestMethod.GET)
  public ResponseEntity<List<CreationResponse>> getCreationsByCategory(@RequestParam(value = "shopId") Long shopId, @RequestParam(value = "categoryList") String categoryList, @RequestParam(value = "page") int page, @RequestParam(value = "size") int size) {
	
	List<Creation> creations = creationService.findCreatonByCategory(shopId, categoryList, page, size);
	
List<CreationResponse> creationResponses = new ArrayList<CreationResponse>();
	
	creations.forEach(creation -> {	
		CreationResponse creationResponse = new CreationResponse(creation,false);
		creationResponses.add(creationResponse);
	});
	
    return new ResponseEntity<List<CreationResponse>>(creationResponses, HttpStatus.OK);
  }
  
  @RequestMapping(value="/creationCountByCategory.do", method= RequestMethod.GET)
  public ResponseEntity<Long> getCreationCountByCategory(@RequestParam(value = "shopId") Long shopId, @RequestParam(value = "categoryList") String categoryList) {
	
	long creationCount = creationService.countCreationByCategory(shopId, categoryList);
	return new ResponseEntity<Long>(creationCount, HttpStatus.OK);
  }
  
  
  @RequestMapping(value="/creationsByProductAndCategory.do", method= RequestMethod.GET)
  public ResponseEntity<List<CreationResponse>> getCreationsByProductAndCategory(@RequestParam(value = "shopId") Long shopId, 
		  @RequestParam(value = "productList") String productList,
		  @RequestParam(value = "categoryList") String categoryList, 
		  @RequestParam(value = "page") int page,
		  @RequestParam(value = "size") int size,
		  @RequestParam(value = "sortType") int sortType) {
	
	List<Creation> creations = creationService.findCreationByProductAndCategory(shopId, productList, categoryList, page, size, sortType);
	
	List<CreationResponse> creationResponses = new ArrayList<CreationResponse>();
	
	creations.forEach(creation -> {	
		CreationResponse creationResponse = new CreationResponse(creation,false);
		creationResponses.add(creationResponse);
	});
	
    return new ResponseEntity<List<CreationResponse>>(creationResponses, HttpStatus.OK);
  }
  
  
  @RequestMapping(value="/creationCountByProuductAndCatetory.do",  method= RequestMethod.GET)
  public ResponseEntity<Long> countCreationByProuductAndCategory(@RequestParam(value = "shopId") Long shopId, 
		@RequestParam(value = "productList") String productList,
		@RequestParam(value = "categoryList") String categoryList) {
	  
    long creationCount = creationService.countCreationByProductAndCategory(shopId, productList, categoryList);
    
    return new ResponseEntity<Long>(creationCount, HttpStatus.OK);

  }
 
  
  @RequestMapping(value = {"/creationsBySubjectAndSize.do"}, method = {RequestMethod.GET})
  public ResponseEntity<List<CreationResponse>> getCreationsBySubjectAndSize(@RequestParam("shopId") Long shopId, @RequestParam("productList") String productList, @RequestParam("categoryList") String categoryList, @RequestParam("subjectIdList") String subjectIdList, @RequestParam("sizeIdList") String sizeIdList, @RequestParam("page") int page, @RequestParam("size") int size, @RequestParam("sortType") int sortType) {
    List<Creation> creations = this.creationService.findCreationBySubjectAndSize(shopId, categoryList, subjectIdList, sizeIdList, page, size, sortType);
    List<CreationResponse> creationResponses = new ArrayList<>();
    creations.forEach(creation -> {
          CreationResponse creationResponse = new CreationResponse(creation, Boolean.valueOf(false));
          creationResponses.add(creationResponse);
        });
    return new ResponseEntity(creationResponses, HttpStatus.OK);
  }
  
  @RequestMapping(value = {"/creationCountBySubjectAndSize.do"}, method = {RequestMethod.GET})
  public ResponseEntity<Long> countCreationBySubjectAndSize(@RequestParam("shopId") Long shopId, @RequestParam("productList") String productList, @RequestParam("categoryList") String categoryList, @RequestParam("subjectIdList") String subjectIdList, @RequestParam("sizeIdList") String sizeIdList) {
    long creationCount = this.creationService.countCreationBySubjectAndSize(shopId, categoryList, subjectIdList, sizeIdList);
    return new ResponseEntity(Long.valueOf(creationCount), HttpStatus.OK);
  }
  
  
  @RequestMapping(value="/creationsByUserId.do", method= RequestMethod.GET)
  public ResponseEntity<List<CreationResponse>> getCreationsByUserId(@RequestParam(value = "userId") Long userId,
		  @RequestParam(value = "page") int page,
		  @RequestParam(value = "size") int size) {
	
	List<Creation> creations = creationService.findCreationByUserId(userId, page, size);
	
	List<CreationResponse> creationResponses = new ArrayList<CreationResponse>();
	
	creations.forEach(creation -> {	
		CreationResponse creationResponse = new CreationResponse(creation,false);
		creationResponses.add(creationResponse);
	});
	
    return new ResponseEntity<List<CreationResponse>>(creationResponses, HttpStatus.OK);
  }
  
  
  @RequestMapping(value="/creationCountByUserId.do",  method= RequestMethod.GET)
  public ResponseEntity<Long> countCreationByUserId(@RequestParam(value = "userId") Long userId) {
	  
    long creationCount = creationService.countCreationByUserId(userId);
    
    return new ResponseEntity<Long>(creationCount, HttpStatus.OK);

  }
  
  @RequestMapping(value="/creationsBySearch.do", method= RequestMethod.GET)
  public ResponseEntity<List<CreationResponse>> getCreationsBySearch(@RequestParam(value = "shopId") Long shopId, @RequestParam(value = "keyword") String keyword,
		  @RequestParam(value = "page") int page, @RequestParam(value = "size") int size) {
	
	List<Creation> creations = creationService.findCreationBySearch(shopId, keyword, page, size);
	
	List<CreationResponse> creationResponses = new ArrayList<CreationResponse>();
	
	creations.forEach(creation -> {	
		CreationResponse creationResponse = new CreationResponse(creation,false);
		creationResponses.add(creationResponse);
	});
	
    return new ResponseEntity<List<CreationResponse>>(creationResponses, HttpStatus.OK);
  }
 
  /*
  @RequestMapping(value="/creationsByUser.do", method= RequestMethod.GET)
  public ResponseEntity<List<ProductResponse>> getCreationsByUser(@RequestParam(value = "userId") Long userId) {
	
	List<VrMallUserRole> vrMallUserRoles = creationService.findCreationUserRoleByUserId(userId);
		
	List<ProductResponse> products = new ArrayList<ProductResponse>();
	
	vrMallUserRoles.forEach(vrMallUserRole -> {
		Optional<Product> productOp = creationService.findProductById(vrMallUserRole.getProductId());
		
		if(productOp.isPresent()) {
			
			ProductResponse productResponse = new ProductResponse(productOp.get(), vrMallUserRole);
			products.add(productResponse);
		}
	});
	
	
	return new ResponseEntity<List<ProductResponse>>(products, HttpStatus.OK);
  }
  */
  
  @RequestMapping(value="/creation.do", method= RequestMethod.POST)
  public ResponseEntity<Creation> createCreation(@RequestBody Creation request) {
				
    Creation result = creationService.createCreation(request);
    
    return new ResponseEntity<Creation>(result, HttpStatus.OK);
  }
  
  
  @RequestMapping(value="/creationUpdate.do", method= RequestMethod.POST)
  public ResponseEntity<Creation> updateCreation(@RequestBody Creation request) {
	  
			
	Creation result = creationService.updateCreation(request);
    return new ResponseEntity<Creation>(result, HttpStatus.OK);
  }
  
  
  @RequestMapping(value="/creationCopy.do", method= RequestMethod.POST)
  public ResponseEntity<Creation> copyCreation(@RequestBody Creation request) {
	  	
	Creation result = creationService.copyCreation(request);
    return new ResponseEntity<Creation>(result, HttpStatus.OK);
  }
  
  
  @RequestMapping(value="/creationDelete.do", method= RequestMethod.POST)
  public ResponseEntity<Creation> deleteCreation(@RequestBody Creation request) {
	  
	Creation creation = new Creation();
	creation.setCreationId(request.getCreationId());
	
	Creation result = creationService.deleteCreation(creation);
	return new ResponseEntity<Creation>(result, HttpStatus.OK);
  }
  
  
  @RequestMapping(value="/creationAssetUpdate.do", method= RequestMethod.POST)
  public ResponseEntity<Creation> updateCreationAssets(@RequestBody CreationRequest request) {
  //public VrMallResponse updateVrMallAssets(HttpServletRequest request, HttpServletResponse response) {
	  
	JSONParser jsonParser = new JSONParser(); 
	//JSONObject jsonObject = (JSONObject) jsonParser.parse(request.get); 
	
	ObjectMapper mapper = new ObjectMapper();

	String vrModelsStr = null;
	try {
		vrModelsStr = mapper.writeValueAsString(request.getVrModels());
		
		System.out.println("vrModels : " + vrModelsStr);
		
	} catch (JsonProcessingException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}

	Creation result = creationService.updateCreationAsset(request.getCreationId(), vrModelsStr);
	return new ResponseEntity<Creation>(result, HttpStatus.OK);
  }
  
  @RequestMapping(value="/creationDotArtAssetUpdate.do", method= RequestMethod.POST)
  public ResponseEntity<Creation> updateDotArtCreationAssets(@RequestBody DotArtRequest request) {
  //public VrMallResponse updateVrMallAssets(HttpServletRequest request, HttpServletResponse response) {
	  
	JSONParser jsonParser = new JSONParser(); 
	//JSONObject jsonObject = (JSONObject) jsonParser.parse(request.get); 
	
	ObjectMapper mapper = new ObjectMapper();

	String vrModelsStr = null;
	try {
		vrModelsStr = mapper.writeValueAsString(request.getVrModels());
		
		System.out.println("vrModels : " + vrModelsStr);
		
	} catch (JsonProcessingException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}

	Creation result = creationService.updateCreationAsset(request.getCreationId(), vrModelsStr);
	return new ResponseEntity<Creation>(result, HttpStatus.OK);
  }
  
  
  @RequestMapping(value="/creationMusicAssetUpdate.do", method= RequestMethod.POST)
  public ResponseEntity<Creation> updateMusicCreationAssets(@RequestBody MusicRequest request) {
  //public VrMallResponse updateVrMallAssets(HttpServletRequest request, HttpServletResponse response) {
	  
	JSONParser jsonParser = new JSONParser(); 
	//JSONObject jsonObject = (JSONObject) jsonParser.parse(request.get); 
	
	ObjectMapper mapper = new ObjectMapper();

	String vrModelsStr = null;
	try {
		vrModelsStr = mapper.writeValueAsString(request.getVrModels());
		
		System.out.println("vrModels : " + vrModelsStr);
		
	} catch (JsonProcessingException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}

	Creation result = creationService.updateCreationAsset(request.getCreationId(), vrModelsStr);
	return new ResponseEntity<Creation>(result, HttpStatus.OK);
  }
  

  @RequestMapping(value="/creation.do", method= RequestMethod.GET)
  public ResponseEntity<Creation> getCreation(@RequestParam(value = "creationId") Long creationId) {
	  
    return creationService.findCreationById(creationId, false)
            .map(creation -> new ResponseEntity<>(creation, HttpStatus.OK))
            .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
  }
  
  @RequestMapping(value="/creationAsset.do", method= RequestMethod.GET)
  public ResponseEntity<Creation> getCreationAsset(@RequestParam(value = "creationId") Long creationId) {
	  
    return creationService.findCreationById(creationId, true)
            .map(creation -> new ResponseEntity<>(creation, HttpStatus.OK))
            .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
  }
  
  
  @RequestMapping(value="/creationLikeUpdate.do", method= RequestMethod.POST)
  public ResponseEntity<Creation> updateCreationLike(@RequestBody CreationLike request) {
	  

	
	Creation result = creationService.updateCreationLike(request);
	return new ResponseEntity<Creation>(result, HttpStatus.OK);
  }
  
  
  @RequestMapping(value="/creationBlacklistUpdate.do", method= RequestMethod.POST)
  public ResponseEntity<Creation> updateCreationBlacklist(@RequestBody CreationBlacklist request) {
	  
	
	Creation result = creationService.updateCreationBlacklist(request);
	return new ResponseEntity<Creation>(result, HttpStatus.OK);
  }
  
  
	
	//////////////////////////////////////
	// Creation Comment
	//////////////////////////////////
	
	@RequestMapping(value="/creationComments.do", method= RequestMethod.GET)
	public ResponseEntity<List<CreationComment>>  getCreationCommentsByCreationId(@RequestParam(value = "creationId") Long creationId ){
		  
		List<CreationComment> creationComments = creationService.findCommentByCreationId(creationId);
		
		
		return new ResponseEntity<List<CreationComment>>(creationComments, HttpStatus.OK);
	}
	
	@RequestMapping(value="/creationComment.do", method= RequestMethod.POST)
	public CreationComment createCreationComment(@RequestBody CreationComment request) {
		  
		CreationComment result = creationService.createCreatComment(request);
		return result;
	}
	  
	  
	@RequestMapping(value="/creationCommentUpdate.do",  method= RequestMethod.POST)
	public CreationComment updateCreationComment(@RequestBody CreationComment request) {
		  
		CreationComment result = creationService.updateCreationComment(request);
		    
		return result;
	
	}
	

	//////////////////////////////////////
	// Creation Comment Replay
	//////////////////////////////////
	
	@RequestMapping(value="/creationCommentReply.do", method= RequestMethod.POST)
	public CreationCommentReply createCreationCommentReply(@RequestBody CreationCommentReply request) {
		  
		CreationCommentReply result = creationService.createCreationCommentReply(request);
		return result;
	}
	  
	  
	@RequestMapping(value="/creationCommentReplyUpdate.do",  method= RequestMethod.POST)
	public CreationCommentReply updateCreationCommentReply(@RequestBody CreationCommentReply request) {
		  
		CreationCommentReply result = creationService.updateCreationCommentReply(request);
		    
		return result;
	}
  
  

	//////////////////////////////////////
	// Creation Like
	//////////////////////////////////
	
	@RequestMapping(value="/creationLike.do", method= RequestMethod.GET)
	public ResponseEntity<CreationLike>  getCreationCommentsByCreationId(@RequestParam(value = "creationId") Long creationId, @RequestParam(value = "userId") Long userId ){
		  
		CreationLike request = new CreationLike();
		
		request.setCreationId(creationId);
		request.setUserId(userId);
		
		CreationLike creationLike = creationService.findCommentLike(request);
		
		if(creationLike == null)
			creationLike = new CreationLike();
		
		return new ResponseEntity<CreationLike>(creationLike, HttpStatus.OK);
	}
  

	//////////////////////////////////////
	// Creation Blacklist
	//////////////////////////////////
	
	@RequestMapping(value="/creationBlacklist.do", method= RequestMethod.POST)
	public CreationBlacklist createBlacklist(@RequestBody CreationBlacklist request) {
		  
		CreationBlacklist result = creationService.createCreationBlacklist(request);
		return result;
	}
	
	
	          
}
