package com.sopoong.brickground.webapp.domain;


import org.json.simple.JSONObject;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Transactional
public class VrMallService {

	@Autowired
	private ShopRepository shopRepository;
  
	@Autowired
	private ProductRepository productRepository;
  
	@Autowired
	private VrMallRepository vrMallRepository;
	
	@Autowired
	private VrMallUserRoleRepository vrMallUserRoleRepository;
	
	@Autowired
	private VrModelRepository vrModelRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private ProductCategoryRepository productCategoryRepository;
	
	@Autowired
	private CartRepository cartRepository;
	
	@Autowired
	private OrderSummaryRepository orderSummaryRepository;
	
	@Autowired
	private OrderRepository orderRepository;
	
	@Autowired
	private DeliveryRepository deliveryRepository;
	
	@Autowired
	private DeliveryPolicyRepository deliveryPolicyRepository;
	
	@Autowired
	private NoticeRepository noticeRepository;
	
	@Autowired
	private FaqRepository faqRepository;
	
	@Autowired
	private QnaRepository qnaRepository;
		


	////////////////////////
	// Shop API
	////////////////////////
	
	public List<Shop> findShop(int page, int size) {

		Pageable pageable = PageRequest.of(page, size);
		
		List<Shop> shops = shopRepository.findAll(pageable);

		return shops;
	}
	
	

	////////////////////////
	// VrMall API
	////////////////////////
	
	public List<VrMall> findVrMallByShopId(Long shopId, int page, int size) {

		Pageable pageable = PageRequest.of(page, size, Sort.by("vrMallId").descending());
		
		List<VrMall> vrMalls = vrMallRepository.findAllByShopId(shopId, pageable);

		for(VrMall vrMall : vrMalls) {
			System.out.println("VR Mall Name : " + vrMall.getVrMallName());
		}
    
		return vrMalls;
	}
	
	public List<VrMall> findVrMallByCategory(Long shopId, String categoryList, int page, int size) {

		Pageable pageable = PageRequest.of(page, size, Sort.by("vrMallId").descending());
		
		String[] categorys = categoryList.split(",");
		
		Long[] categoryl = new Long[categorys.length];
		
		for(int index= 0; index < categorys.length; index++) {
			
			categoryl[index] = Long.parseLong(categorys[index]);		
		}
		
		
		List<VrMall> vrMalls = vrMallRepository.findAllByCategory(shopId, categoryl, pageable);

		for(VrMall vrMall : vrMalls) {
			System.out.println("VR Mall Name : " + vrMall.getVrMallName());
		}
    
		return vrMalls;
	}
	
	
	public List<VrMall> findVrMallBySearch(Long shopId, String keyword, int page, int size) {
		
		
		List<VrMall> vrMalls = vrMallRepository.findAllBySearch(shopId, keyword);
    
		for(VrMall vrMall : vrMalls) {
			System.out.println("VR Mall Name : " + vrMall.getVrMallName());
		}
    
		return vrMalls;
	}
  
  
	public VrMall createVrMall(VrMall request) {
	  
		VrMall vrMall = VrMall.builder()
							.shopId(request.getShopId())
							.vrMallName(request.getVrMallName())
							.categoryId(request.getCategoryId())
							.visible(request.getVisible())
							.introImage(request.getIntroImage())
							.coverImage(request.getCoverImage())
							.videoImage(request.getVideoImage())
							.videoData(request.getVideoData())
							.manualData(request.getManualData())
							.programData(request.getProgramData())
							.setNames(request.getSetNames())
							.description(request.getDescription())
							.createDate(LocalDateTime.now())
							.build();
	  
		vrMallRepository.save(vrMall);
	  
		return vrMall;
	}
	
	
	public VrMall updateVrMall(VrMall request) {
		  
		VrMall vrMall = null;
		
		Optional<VrMall> vrMallOp = vrMallRepository.findById(request.getVrMallId());
		
		if(vrMallOp.isPresent()) {
			
			vrMall = vrMallOp.get();
			vrMall.setShopId(request.getShopId());
			vrMall.setVrMallName(request.getVrMallName());
			vrMall.setCategoryId(request.getCategoryId());
			vrMall.setVisible(request.getVisible());		
			vrMall.setCoverImage(request.getCoverImage());
			vrMall.setIntroImage(request.getIntroImage());
			vrMall.setVideoImage(request.getVideoImage());
			vrMall.setVideoData(request.getVideoData());
			vrMall.setManualData(request.getManualData());
			vrMall.setProgramData(request.getProgramData());
			vrMall.setSetNames(request.getSetNames());
			vrMall.setDescription(request.getDescription());
			vrMall.setUpdateDate(LocalDateTime.now());
			
			vrMallRepository.save(vrMall);
		}	
		
		return vrMall;
	}
	
	public VrMall copyVrMall(VrMall request) {
		  
		VrMall vrMall = null;
		
		Optional<VrMall> vrMallOp = vrMallRepository.findById(request.getVrMallId());
		
		if(vrMallOp.isPresent()) {
			
			VrMall vrMallOrg = vrMallOp.get();
			String vrMallName = vrMallOrg.getVrMallName() + "_복사";
			
			vrMall = VrMall.builder()
					.shopId(vrMallOrg.getShopId())
					.vrMallName(vrMallName)
					.categoryId(vrMallOrg.getCategoryId())
					.visible(vrMallOrg.getVisible())
					.introImage(vrMallOrg.getIntroImage())
					.coverImage(vrMallOrg.getCoverImage())
					.videoImage(vrMallOrg.getVideoImage())
					.videoData(vrMallOrg.getVideoData())
					.manualData(vrMallOrg.getManualData())
					.programData(vrMallOrg.getProgramData())
					.setNames(vrMallOrg.getSetNames())
					.description(vrMallOrg.getDescription())
					.vrModels(vrMallOrg.getVrModels())
					.createDate(LocalDateTime.now())
					.build();

			vrMallRepository.save(vrMall);

		}	
		
		return vrMall;
	}
	
	
	public VrMall deleteVrMall(VrMall request) {
		  
		vrMallRepository.deleteById(request.getVrMallId());
		
		return request;
	}
	
	
	public VrMall updateVrMallAsset(Long vrMallId, String vrModels) {
		  
		Optional<VrMall> vrMall = vrMallRepository.findById(vrMallId);
		
		VrMall newVrMall = null;
		
		if(vrMall.isPresent()) {
			
			newVrMall = vrMall.get();
			newVrMall.setVrModels(vrModels);
			
			vrMallRepository.save(newVrMall);
		}	
	  
		return newVrMall;
	}
	
  
	public Optional<VrMall> findVrMallById(Long vrMallId) {
		
		Optional<VrMall> vrMall = vrMallRepository.findById(vrMallId);
		
		if(vrMall.isPresent()) {
			
			VrMall newVrMall = vrMall.get();
			newVrMall.setViewCount(newVrMall.getViewCount() + 1);
			
			vrMallRepository.save(newVrMall);
		}	

		
		return vrMallRepository.findById(vrMallId);
	}
	
	
	public long countVrMallByCategory(Long shopId, String categoryList) {
		
		String[] categorys = categoryList.split(",");
		
		Long[] categoryl = new Long[categorys.length];
		
		for(int index= 0; index < categorys.length; index++) {
			
			categoryl[index] = Long.parseLong(categorys[index]);		
		}
		
		
		return vrMallRepository.countByCategory(shopId, categoryl);

	}
	
	
	public List<VrMall> findVrMallByProductAndCategory(Long shopId, String productList, String categoryList, int page, int size) {

		Pageable pageable = PageRequest.of(page, size, Sort.by("vrMallId").descending());
		
		String[] products = productList.split(",");
		String[] categorys = categoryList.split(",");
		
		ArrayList<String> productl = new ArrayList<String>();
		
		int index = 0;
		
		for(index= 0; index < products.length; index++) {
						
			if(products[index].compareTo("45678") == 0) {
				productl.add("45678");
				productl.add("45678,45680");
			}
			else if(products[index].compareTo("51515") == 0) {
				productl.add("51515");
				productl.add("51515,99998");
			}
			else if(products[index].compareTo("45544") == 0) {
				productl.add("45544");
				productl.add("45544,45560");
				productl.add("31313");
			}
			else {
				productl.add(products[index]);
			}
		}
		
		Long[] categoryl = new Long[categorys.length];
		
		for(index= 0; index < categorys.length; index++) {
			
			categoryl[index] = Long.parseLong(categorys[index]);		
		}
		
		
		List<VrMall> vrMalls = vrMallRepository.findAllByProductAndCategory(shopId, productl.toArray(new String[productl.size()]), categoryl, pageable);

		/*
		for(VrMall vrMall : vrMalls) {
			System.out.println("VR Mall Name : " + vrMall.getVrMallName());
		}
		*/
    
		return vrMalls;
	}
	
	
	public long countVrMallByProductAndCategory(Long shopId, String productList,  String categoryList) {
		
		String[] products = productList.split(",");
		String[] categorys = categoryList.split(",");
		
		ArrayList<String> productl = new ArrayList<String>();
		
		int index = 0;
		
		for(index= 0; index < products.length; index++) {
			
			if(products[index].compareTo("45678") == 0) {
				productl.add("45678");
				productl.add("45678,45680");
			}
			else if(products[index].compareTo("51515") == 0) {
				productl.add("51515");
				productl.add("51515,99998");
			}
			else if(products[index].compareTo("45544") == 0) {
				productl.add("45544");
				productl.add("45544,45560");
				productl.add("31313");
			}
			else {
				productl.add(products[index]);
			}

		}
		
		
		
		Long[] categoryl = new Long[categorys.length];
		
		for(index= 0; index < categorys.length; index++) {
			
			categoryl[index] = Long.parseLong(categorys[index]);		
		}
		
		
		return vrMallRepository.countByProductAndCategory(shopId, productl.toArray(new String[productl.size()]), categoryl);

	}
	

	////////////////////////
	// VrMall User Role API
	////////////////////////
	
	public List<VrMallUserRole> findVrMallUserRoleByUserId(Long userId) {
		
		List<VrMallUserRole> vrMallUserRoles = vrMallUserRoleRepository.findAllByUserId(userId);

		return vrMallUserRoles;
	}
  
  
	public VrMallUserRole createVrMallUserRole(VrMallUserRole request) {
	  
		VrMallUserRole vrMallUserRole = VrMallUserRole.builder()
							.userId(request.getUserId())
							.vrMallId(request.getVrMallId())
							.productId(request.getProductId())
							.roleId(request.getRoleId())
							.status(request.getStatus())
							.timeStart(request.getTimeStart())
							.timeEnd(request.getTimeEnd())
							.modifierId(request.getModifierId())
							.timeCreated(LocalDateTime.now())
							.build();
							
		vrMallUserRoleRepository.save(vrMallUserRole);
	  
		return vrMallUserRole;
	}
	
	
	public VrMallUserRole updateVrMallUserRole(VrMallUserRole request) {
		  
		
		Optional<VrMallUserRole> vrMallUserRoleOp = vrMallUserRoleRepository.findById(request.getVrMallUserRoleId());
		
		VrMallUserRole vrMallUserRole = null;
		
		if(vrMallUserRoleOp.isPresent()) {
			
			vrMallUserRole = vrMallUserRoleOp.get();
			vrMallUserRole.setRoleId(request.getRoleId());
			vrMallUserRole.setStatus(request.getStatus());
			vrMallUserRole.setTimeStart(request.getTimeStart());
			vrMallUserRole.setTimeEnd(request.getTimeEnd());
			vrMallUserRole.setModifierId(request.getModifierId());
			vrMallUserRole.setTimeModified(LocalDateTime.now());
			
			vrMallUserRoleRepository.save(vrMallUserRole);
		}	
		
		
		return vrMallUserRole;
	}
	
  
	public VrMallUserRole deleteVrMallUserRole(VrMallUserRole request) {
		  
		Optional<VrMallUserRole> vrMallUserRoleOp = vrMallUserRoleRepository.findByVrMallIdAndUserId(request.getVrMallId(),  request.getUserId());
		
		VrMallUserRole vrMallUserRole = null;
		
		if(vrMallUserRoleOp.isPresent()) {
			
			vrMallUserRoleRepository.deleteById(vrMallUserRoleOp.get().getVrMallUserRoleId());
		}	
	  
		return vrMallUserRole;
	}	
	

	////////////////////////
	// VrModel API
	////////////////////////
	
	public List<VrModel> findVrModelByShopId(Long shopId) {

		
		List<VrModel> vrModels = vrModelRepository.findAllByShopId(shopId);

    
		return vrModels;
	}
	
	
	public List<VrModel> findVrModelBySetName(String setName) {
		
		List<VrModel> vrModels = vrModelRepository.findAllBySetName(setName);

    
		return vrModels;
	}
	
	public List<VrModel> findVrModelBySetNames(String setNames) {

		String[] nameArr = setNames.split(",");		
		
		List<VrModel> vrModels = vrModelRepository.findAllBySetNames(nameArr);

    
		return vrModels;
	}

  
	public VrModel createVrModel(Long shopId, String vrModelType, String vrModelName, String modelPath, 
									String material, String normalMap, String texture, String clickable) {
	  
		VrModel vrModel = VrModel.builder()
							.shopId(shopId)
							.vrModelType(vrModelType)
							.vrModelName(vrModelName)
							.modelPath(modelPath)
							.material(material)
							.normalMap(normalMap)
							.texture(texture)
							.clickable(clickable)
							.build();
	  
		vrModelRepository.save(vrModel);
	  
		return vrModel;
	}
	
  
  
	///////////////////
	// Product API
	///////////////////

	public List<Product> findProductsByShopId(Long shopId, int page, int size) {
		Shop shop = shopRepository.findById(shopId).get();
    
		//System.out.println("shop  : " + shop);

		Pageable pageable = PageRequest.of(page, size, Sort.by("productId").descending());
		
		
		List<Product> products = productRepository.findAllByShopId(shopId, pageable);

		//List<Product> products = shop.getProducts();

		for(Product product : products) {
			System.out.println("Product Name : " + product.getProductName());
		}
    
		return products;
	}
	
	public List<Product> findProductsBySearch(Long shopId, String keyword, int page, int size) {

		
		List<Product> products = productRepository.findAllBySearch(shopId, keyword);

		//List<Product> products = shop.getProducts();

		for(Product product : products) {
			System.out.println("Product Name : " + product.getProductName());
		}
    
		return products;
	}
	
	
	public List<Product> findProductsByCategory(Long shopId, String categoryList, int page, int size) {

		
		String[] categorys = categoryList.split(",");
		
		Long[] categoryl = new Long[categorys.length];
		
		for(int index= 0; index < categorys.length; index++) {
			
			categoryl[index] = Long.parseLong(categorys[index]);		
		}
		
		
		Pageable pageable = PageRequest.of(page, size, Sort.by("productId").descending());
		
		List<Product> products = productRepository.findAllByCategory(shopId, categoryl, pageable);

    
		return products;
	}

  
  
	public Product createProduct(Product request) {
	  
		Product product = Product.builder()
								.shopId(request.getShopId())
								.productName(request.getProductName())
								.productFullName(request.getProductFullName())
								.categoryId(request.getCategoryId())
								.price(request.getPrice())
								.remainder(request.getRemainder())
								.vrModelName(request.getVrModelName())
								.coverImage(request.getCoverImage())
								.description(request.getDescription())
								.productSetName(request.getProductSetName())
								.subjectId(request.getSubjectId())
								.levelId(request.getLevelId())
								.visible(request.getVisible())
								.createDate(LocalDateTime.now())
								.build();
	  
		productRepository.save(product);
	  
		return product;
	}
	
	public Product updateProduct(Product param) {
		  
		Product newProduct = null;
		
		Optional<Product> product = productRepository.findById(param.getProductId());
				
		if(product.isPresent()) {
			
			newProduct = product.get();
			newProduct.setProductFullName(param.getProductFullName());
			newProduct.setPrice(param.getPrice());
			newProduct.setRemainder(param.getRemainder());
			newProduct.setDescription(param.getDescription());
			newProduct.setCoverImage(param.getCoverImage());
			newProduct.setCategoryId(param.getCategoryId());
			newProduct.setVisible(param.getVisible());
			newProduct.setProductSetName(param.getProductSetName());
			newProduct.setSubjectId(param.getSubjectId());
			newProduct.setLevelId(param.getLevelId());
			newProduct.setUpdateDate(LocalDateTime.now());
			
	        productRepository.save(newProduct);
		}	
		
		
		return newProduct;
	}
  
  
	public Optional<Product> findProductById(Long productId) {
		return productRepository.findById(productId);
	}
	
	public long countProductByShopId(Long shopId) {

		return productRepository.countByShopId(shopId);

	}
	
	
	public List<Product> findManualsByProuductSetAndLevel(Long shopId, String productSetList,  String levelList, int page, int size) {

		
		String[] productSets = productSetList.split(",");
		String[] levels = levelList.split(",");
		
		Integer[] levell = new Integer[levels.length];
		
		int index = 0;
		for(index= 0; index < levell.length; index++) {
			
			levell[index] = Integer.parseInt(levels[index]);		
		}
		
		Long[] categoryl = new Long[1];
		categoryl[0] = 201L;
		
		
		Pageable pageable = PageRequest.of(page, size, Sort.by("productId").descending());
		
		List<Product> products = productRepository.findAllByCategoryAndProductSetAndLevel(shopId, categoryl, productSets, levell, pageable);
    
		return products;
	}
	
	public long countManualByProuductSetAndLevel(Long shopId, String productSetList,  String levelList) {

		String[] productSets = productSetList.split(",");
		String[] levels = levelList.split(",");
		
		Integer[] levell = new Integer[levels.length];
		
		int index = 0;
		for(index= 0; index < levell.length; index++) {
			
			levell[index] = Integer.parseInt(levels[index]);		
		}
		
		Long[] categoryl = new Long[1];
		categoryl[0] = 201L;
		
		
		return productRepository.countByCategoryAndProductSetAndLevel(shopId, categoryl, productSets, levell);

	}
	
	 
	
	public List<Product> findProductsByCategoryAndSubject(String categoryList,  String subjectList, int page, int size) {
		
		int index = 0;
		
		String[] categorys = categoryList.split(",");
		Long[] categoryl = new Long[categorys.length];
		for(index= 0; index < categoryl.length; index++) {
			
			categoryl[index] = Long.parseLong(categorys[index]);		
		}
		
		String[] subjects = subjectList.split(",");
		Integer[] subjectl = new Integer[subjects.length];
		for(index= 0; index < subjectl.length; index++) {
			
			subjectl[index] = Integer.parseInt(subjects[index]);		
		}
		
		
		Pageable pageable = PageRequest.of(page, size, Sort.by("productId").descending());
		
		List<Product> products = productRepository.findAllByCategoryAndSubject(categoryl, subjectl, pageable);
    
		return products;
	}
	
	public long countProductByCategoryAndSubject(String categoryList,  String subjectList) {

		int index = 0;
		
		String[] categorys = categoryList.split(",");
		Long[] categoryl = new Long[categorys.length];
		for(index= 0; index < categoryl.length; index++) {
			
			categoryl[index] = Long.parseLong(categorys[index]);		
		}
		
		String[] subjects = subjectList.split(",");
		Integer[] subjectl = new Integer[subjects.length];
		for(index= 0; index < subjectl.length; index++) {
			
			subjectl[index] = Integer.parseInt(subjects[index]);		
		}
				
		return productRepository.countByCategoryAndSubject(categoryl, subjectl);

	}
	
	///////////////////
	// Shop API
	///////////////////
  
	public Shop createShop(String shopName, Long managerId) {
	  
		Shop shop = Shop.builder()
								.shopName(shopName)
								.managerId(managerId)
								.shopStatusCode("Y")
								.createDate(LocalDateTime.now())
								.build();
	  
		shopRepository.save(shop);
	  
		return shop;
	}
  
  
	public Optional<Shop> findShopById(Long shopId) {
		return shopRepository.findById(shopId);
	}  
	  
	 
	  
	///////////////////
	// User API
	///////////////////
 
	public User createUser(Long shopId, String userName, String userNickname, String password, String email, String mobile, int createMode) {
	  
		User user = User.builder()
								.shopId(shopId)
								.password( BCrypt.hashpw(password, BCrypt.gensalt()) )
								.email(email)
								.userName(userName)
								.userNickname(userNickname)
								.mobile(mobile)
								.userStatusCode("Y")
								.point(0L)
								.ipAddress("0.0.0.0")
								.maxSession(1)
								.createMode(createMode)
								.avatarModel("guest")
								.createDate(LocalDateTime.now())
								.build();
	  
		userRepository.save(user);
	  
		return user;
	}
	
	
	public User usedEmailCheck(String email) {
		  
		User user = userRepository.findUserByEmail(email);
	  
		return user;
	}
	
	public Optional<User> findUserById(Long userId) {
		return userRepository.findById(userId);
	} 
	
	public List<User> findUsersByShopId(Long shopId) {
		
		Pageable page = PageRequest.of(0, 10);
		
		List<User> userList = userRepository.findUserByShopId(shopId, page);

    
		return userList;
	}
	
	public User updateUserInfo(User request) {
	    User newUser = null;
	    Optional<User> user = this.userRepository.findById(request.getUserId());
	    if (user.isPresent()) {
	      newUser = user.get();
	      newUser.setEmail(request.getEmail());
	      newUser.setUserName(request.getUserName());
	      newUser.setUserNickname(request.getUserNickname());
	      newUser.setUpdateDate(LocalDateTime.now());
	      this.userRepository.save(newUser);
	    } 
	    return newUser;
	}
	
	public User updateUserPassword(Long userId, String password) {
		  
		User newUser = null;
		
		Optional<User> user = userRepository.findById(userId);
				
		if(user.isPresent()) {
			
			newUser = user.get();
			newUser.setPassword( BCrypt.hashpw(password, BCrypt.gensalt()) );
			newUser.setUpdateDate(LocalDateTime.now());
			
			userRepository.save(newUser);
		}	
		
		return newUser;
	}
	
	public User updateUserFirebaseId(Long userId, String firebaseId) {
		  
		User newUser = null;
		
		Optional<User> user = userRepository.findById(userId);
				
		if(user.isPresent()) {
			
			newUser = user.get();
			newUser.setFirebaseId(firebaseId);
			newUser.setUpdateDate(LocalDateTime.now());
			
			userRepository.save(newUser);
		}	
				
		return newUser;
	}
	
	public List<User> findUserByFirebaseId() {
		
		return userRepository.findUserByFirebaseId();
	} 
	
	
	public User updatePoint(Long userId, Long point) {
		  
		User newUser = null;
		
		Optional<User> user = userRepository.findById(userId);
				
		if(user.isPresent()) {
			
			newUser = user.get();
			newUser.setPoint(point);
			newUser.setUpdateDate(LocalDateTime.now());
			
			userRepository.save(newUser);
		}	
		
		
		return newUser;
	}
	
	public long addPoint(Long userId, Long bonusPoint) {
		  
		long totalPoint = 0;
		
		Optional<User> user = userRepository.findById(userId);
				
		if(user.isPresent()) {
			
			User newUser = user.get();
			
			totalPoint = newUser.getPoint() + bonusPoint;
			newUser.setPoint(totalPoint);
			newUser.setUpdateDate(LocalDateTime.now());
			
			userRepository.save(newUser);
		}	
			
		return totalPoint;
	}
	
	public User updateAvatarModel(Long userId, String avatarModel) {
		  
		User newUser = null;
		
		Optional<User> user = userRepository.findById(userId);
				
		if(user.isPresent()) {
			
			newUser = user.get();
			newUser.setAvatarModel(avatarModel);
			newUser.setUpdateDate(LocalDateTime.now());
			
			userRepository.save(newUser);
		}	
		
		
		return newUser;
	}
	

	public User checkLogin (String email, String password) {
		
		User user = userRepository.findUserByEmail(email);
		
		
		if (user != null && BCrypt.checkpw(password, user.getPassword())) { 
			
			return user; 
		}
		
		return null;
	}
	
	
	
	///////////////////
	// Cart API
	///////////////////

	public List<Cart> findCartsByUserId(long shopId, long userId) {
		
		String orderState = "W"; 
		
		List<Cart> cartList = cartRepository.findAllByShopIdAndUserIdAndOrderState(shopId, userId, orderState);
    
    
		return cartList;
	}	
	
	public Cart createCart(Cart request) {

		Cart cart = Cart.builder()
			.userId(request.getUserId())
			.shopId(request.getShopId())
			.productId(request.getProductId())
			.categoryId(request.getCategoryId())
			.productName(request.getProductName())
			.coverImage(request.getCoverImage())
			.count(request.getCount())
			.price(request.getPrice())
			.orderState("W")
			.vrMallId(request.getVrMallId())
			.createDate(LocalDateTime.now())
			.build();
		
		cartRepository.save(cart);
		
		return cart;
	}
	
	public Cart updateCartById(Cart request) {
		
		Cart newCart = null;
		
		Optional<Cart> cart = cartRepository.findByShopIdAndUserIdAndProductIdAndOrderState(
				request.getShopId(), request.getUserId(), request.getProductId(), "W");
				
		if(cart.isPresent()) {
			
			newCart = cart.get();
			newCart.setCount(newCart.getCount() + request.getCount());
			newCart.setUpdateDate(LocalDateTime.now());
			
	        cartRepository.save(newCart);
		}	
		else {
			newCart = createCart(request);
		}
		
		return newCart;
	}
	
	public List<Cart> updateCarts(List<Cart> request) {
		
		List<Cart> cartList = new ArrayList<Cart>();
		
		request.forEach( item -> cartList.add(updateCartById(item)) );
		
		return cartList;
	}
	
	
	public Cart updateCartCount(Cart request) {
		
		Cart newCart = null;
		
		Optional<Cart> cart = cartRepository.findByShopIdAndUserIdAndProductIdAndOrderState(
				request.getShopId(), request.getUserId(), request.getProductId(), "W");
				
		if(cart.isPresent()) {
			
			newCart = cart.get();
			newCart.setCount(request.getCount());
			newCart.setUpdateDate(LocalDateTime.now());
			
	        cartRepository.save(newCart);
		}	
		
		
		return newCart;
	}

	public Cart deleteCartById(Long cartId) {
		
		Cart newCart = null;
		
		Optional<Cart> cart = cartRepository.findById(cartId);
				
		if(cart.isPresent()) {
			
			newCart = cart.get();
			newCart.setOrderState("D");
			newCart.setUpdateDate(LocalDateTime.now());
			
	        cartRepository.save(newCart);
		}	
		
		
		return newCart;
	}

	public Cart deleteCartById(Cart request) {
		
		Cart newCart = null;
		
		Optional<Cart> cart = cartRepository.findByShopIdAndUserIdAndProductIdAndOrderState(
				request.getShopId(), request.getUserId(), request.getProductId(), "W");
				
		if(cart.isPresent()) {
			
			newCart = cart.get();
			newCart.setOrderState("D");
			newCart.setUpdateDate(LocalDateTime.now());
			
	        cartRepository.save(newCart);
		}	
		
		
		return newCart;
	}
	
	public List<Cart> deleteCarts(List<Cart> request) {
		
		List<Cart> cartList = new ArrayList<Cart>();
		
		request.forEach( item -> cartList.add(deleteCartById(item)) );
		
		return cartList;
	}
	  	
	
	
	///////////////////
	// Order Summary API
	///////////////////

	public Optional<OrderSummary> findOrdersById(Long orderSummaryId) {
		
		return orderSummaryRepository.findById(orderSummaryId);
	}	

	public List<OrderSummary> findOrdersByUserId(Long userId, int page, int size) {
		
		Pageable pageable = PageRequest.of(page, size, Sort.by("orderSummaryId").descending());
		
		List<OrderSummary> orderSummaryList = orderSummaryRepository.findAllByUserId(userId, pageable);
    
		for(OrderSummary orderSummary : orderSummaryList) {
	
			System.out.println("Order Count : " + orderSummary.getOrders().size());
		}

    
		return orderSummaryList;
	}	
	
	public List<OrderSummary> findOrdersByShopId(Long shopId, int page, int size) {
		
		Pageable pageable = PageRequest.of(page, size, Sort.by("orderSummaryId").descending());
		
		List<OrderSummary> orderSummaryList = orderSummaryRepository.findAllByShopId(shopId, pageable);
    
		for(OrderSummary orderSummary : orderSummaryList) {
			
//			Optional<Delivery> delivery = deliveryRepository.findById(orderSummary.getDeliveryId());
//			
//			if(delivery.isPresent()) {
//				orderSummary.setDelivery(delivery.get());
//			}	
			
			System.out.println("Order Count : " + orderSummary.getOrders().size());
		}

    
		return orderSummaryList;
	}
	
	public OrderSummary createOrderSummary(OrderSummary request) {
		
		User user = null;
		Delivery delivery = null;
		
		Optional<User> userOp = userRepository.findById(request.getUserId());
		if(userOp.isPresent())
			user = userOp.get();
		
		Optional<Delivery> deliveryOp = deliveryRepository.findById(request.getDeliveryId());
		if(deliveryOp.isPresent())
			delivery = deliveryOp.get();
		
		if(user == null || delivery == null)
			return null;
		  
		OrderSummary orderSummary = OrderSummary.builder()
									.userId(request.getUserId())
									.userName(user.getUserName())
									.shopId(request.getShopId())
									.deliveryId(request.getDeliveryId())
									.address(delivery.getAddress())
									.detailAddress(delivery.getDetailAddress())
									.zip(delivery.getZip())
									.phone(delivery.getPhone())
									.email(delivery.getEmail())
									.orderCount(request.getOrderCount())
									.totalPrice(request.getTotalPrice())
									.payedMoney(request.getPayedMoney())
									.payedPoint(request.getPayedPoint())
									.bonusPoint(request.getBonusPoint())
									.deliveryPrice(request.getDeliveryPrice())
									.deliveryState("P")
									.confirmState("N")
									.impUid(request.getImpUid())
									.merchantUid(request.getMerchantUid())
									.applyNumber(request.getApplyNumber())
									.createDate(LocalDateTime.now())
									.build();
		
		orderSummaryRepository.save(orderSummary);					
	
		
		request.getOrders().forEach(item -> {
												Order order = Order.builder()
														.orderSummaryId(orderSummary.getOrderSummaryId())
														.cartId(item.getCartId())
														.userId(orderSummary.getUserId())
														.shopId(orderSummary.getShopId())
														.productId(item.getProductId())
														.categoryId(item.getCategoryId())
														.productName(item.getProductName())
														.coverImage(item.getCoverImage())
														.count(item.getCount())
														.price(item.getPrice())
														.deliveryState("S")
														.confirmState("N")
														.vrMallId(item.getVrMallId())
														.createDate(LocalDateTime.now())
														.build();

												orderRepository.save(order);
												
												
												if(item.getCategoryId() == 201) {
													
													VrMallUserRole vrMallUserRole = VrMallUserRole.builder()
															.vrMallId(item.getVrMallId())
															.userId(orderSummary.getUserId())
															.productId(item.getProductId())
															.roleId(1L)
															.status(1)
															.timeStart(LocalDateTime.now())
															.timeEnd(LocalDateTime.now().plusYears(1))
															.timeCreated(LocalDateTime.now())
															.build();
													
													vrMallUserRoleRepository.save(vrMallUserRole);
													
												}
												
												deleteCartById(item.getCartId());
											}
										);
		
		
		Long point = user.getPoint() - orderSummary.getPayedPoint() + orderSummary.getBonusPoint();
		user.setPoint(point);
		user.setUpdateDate(LocalDateTime.now());
		
		userRepository.save(user);
		  
		return orderSummary;
	}
	
	public OrderSummary updateOrderSummaryDeliveryState(OrderSummary request) {
		  
		Optional<OrderSummary> orderSummary = orderSummaryRepository.findById(request.getOrderSummaryId());
		
		OrderSummary newOrderSummary = null;
		
		if(orderSummary.isPresent()) {
			newOrderSummary = orderSummary.get();
			newOrderSummary.setDeliveryState(request.getDeliveryState());
			newOrderSummary.setInvoiceNumber(request.getInvoiceNumber());
			newOrderSummary.setUpdateDate(LocalDateTime.now());
			
	        orderSummaryRepository.save(newOrderSummary);
		}	
		  
		return newOrderSummary;
	}
	
	public OrderSummary updateOrderSummaryImpUid(OrderSummary request) {
	    Optional<OrderSummary> orderSummary = this.orderSummaryRepository.findById(request.getOrderSummaryId());
	    OrderSummary newOrderSummary = null;
	    if (orderSummary.isPresent()) {
	      newOrderSummary = orderSummary.get();
	      newOrderSummary.setImpUid(request.getImpUid());
	      newOrderSummary.setApplyNumber(request.getApplyNumber());
	      newOrderSummary.setUpdateDate(LocalDateTime.now());
	      orderSummaryRepository.save(newOrderSummary);
	    } 
	    return newOrderSummary;
	}
	  
	
	public long countOrderSummaryByShopId(Long shopId) {

		return orderSummaryRepository.countByShopId(shopId);

	}
	
	public long countOrderSummaryByUserId(Long userId) {

		return orderSummaryRepository.countByUserId(userId);

	}
	
	
	
	/////////////////////////
	// Delivery API
	/////////////////////////

	public List<Delivery> findDeliverysByUserId(Long userId) {
			
		List<Delivery> deliveryList = deliveryRepository.findAllByUserId(userId);
    
		return deliveryList;
	}	
	
	public Optional<Delivery> findDeliveryById(Long deliveryId) {
		
		return deliveryRepository.findById(deliveryId);

	}	
	
	public Optional<Delivery> findDeliveryByAdderess(String address, String detailAddress, String phone, String email) {
		
		return deliveryRepository.findByAddressAndDetailAddressAndPhoneAndEmail(address, detailAddress, phone, email);

	}	
	
	
	public Delivery createDelivry(Long userId, Long shopId, String areaNo, String address, String detailAddress,
								String zip, String phone, String email) {

		Delivery delivery = Delivery.builder()
						.userId(userId)
						.shopId(shopId)
						.address(address)
						.detailAddress(detailAddress)
						.zip(zip)
						.phone(phone)
						.email(email)
						.createDate(LocalDateTime.now())
						.build();
		
		deliveryRepository.save(delivery);
		
		return delivery;
	}
	
	public void deleteDelivery(Long deliveryId) {

		deliveryRepository.deleteById(deliveryId);

	}
	
	
	
	/////////////////////////
	// Delivery Policy API
	/////////////////////////

	
	public Optional<DeliveryPolicy> findDeliveryPolicyByShopId(Long shopId) {
		
		return deliveryPolicyRepository.findByShopId(shopId);
    
	}	
	
	
	public DeliveryPolicy updateDeliveryPolicy(DeliveryPolicy request) {
		  
		Optional<DeliveryPolicy> deliveryPolicy = deliveryPolicyRepository.findById(request.getDeliveryPolicyId());
		
		DeliveryPolicy newDeliveryPolicy = null;
		
		if(deliveryPolicy.isPresent()) {
			newDeliveryPolicy = deliveryPolicy.get();
			newDeliveryPolicy.setPriceMode(request.getPriceMode());
			newDeliveryPolicy.setBasePrice(request.getBasePrice());
			newDeliveryPolicy.setBaseCount(request.getBaseCount());
			newDeliveryPolicy.setDeliveryPrice(request.getDeliveryPrice());
			newDeliveryPolicy.setUpdateDate(LocalDateTime.now());
			
			deliveryPolicyRepository.save(newDeliveryPolicy);
		}	
		  
		return newDeliveryPolicy;
	}
		
	
	
	/////////////////////////
	// Notice API
	/////////////////////////

	public List<Notice> findNoticesByShopId(Long shopId) {
			
		List<Notice> noticeList = noticeRepository.findAllByShopId(shopId);
    
		return noticeList;
	}	
	
	public List<Notice> findNotices(int page, int size) {
				
		Pageable pageable = PageRequest.of(page, size, Sort.by("noticeId").descending());
		
		List<Notice> noticeList = noticeRepository.findAll(pageable);
    
		return noticeList;
	}	
	
	public Notice createNotice(Long userId, Long shopId, String noticeType, String noticeTitle, String noticeDescription) {

		Notice notice = Notice.builder()
						.userId(userId)
						.shopId(shopId)
						.noticeType(noticeType)
						.noticeTitle(noticeTitle)
						.noticeDescription(noticeDescription)
						.createDate(LocalDateTime.now())
						.build();
		
		noticeRepository.save(notice);
		
		return notice;
	}
	
	public void deleteNotice(Long noticeId) {

		noticeRepository.deleteById(noticeId);

	}
	
	public long countNotice() {

		return noticeRepository.count();

	}
	
		
	
	/////////////////////////
	// Faq API
	/////////////////////////

	public List<Faq> findFaqsByShopId(Long shopId) {
			
		List<Faq> faqList = faqRepository.findAllByShopId(shopId);
		
		return faqList;
	}	
	
	public List<Faq> findFaqs(int page, int size) {
		
		//List<Faq> faqList = faqRepository.findAllByShopId(shopId);
		
		Pageable pageable = PageRequest.of(page, size, Sort.by("faqId").descending());
		
		List<Faq> faqList = faqRepository.findAll(pageable);
    
		return faqList;
	}	
	
	public Faq createFaq(Long userId, Long shopId, String faqType, String faqTitle, String faqDescription) {

		Faq faq = Faq.builder()
						.userId(userId)
						.shopId(shopId)
						.faqType(faqType)
						.faqTitle(faqTitle)
						.faqDescription(faqDescription)
						.createDate(LocalDateTime.now())
						.build();
		
		faqRepository.save(faq);
		
		return faq;
	}
	
	public void deleteFaq(Long faqId) {

		faqRepository.deleteById(faqId);

	}
	
	
	public long countFaq() {

		return faqRepository.count();

	}
	
	
	
	/////////////////////////
	// Qna API
	/////////////////////////

	public List<Qna> findQnasByShopId(Long shopId, Long userId) {
			
		List<Qna> qnaList = qnaRepository.findAllByShopIdAndUserId(shopId, userId);
    
		return qnaList;
	}	
	
	public List<Qna> findQnas(Long userId, int page, int size) {
		
		//List<Faq> faqList = faqRepository.findAllByShopId(shopId);
		
		Pageable pageable = PageRequest.of(page, size, Sort.by("qnaId").descending());
		
		List<Qna> qnaList = qnaRepository.findAllByUserId(userId, pageable);
    
		return qnaList;
	}	
	
	public Qna createQna(Long userId, Long shopId, String qnaType, String qnaTitle, String qnaQuestion, String qnaAnswer) {

		Qna qna = Qna.builder()
						.userId(userId)
						.shopId(shopId)
						.qnaType(qnaType)
						.qnaTitle(qnaTitle)
						.qnaQuestion(qnaQuestion)
						.qnaAnswer(qnaAnswer)
						.qnaState("W")
						.createDate(LocalDateTime.now())
						.build();
		
		qnaRepository.save(qna);
		
		return qna;
	}
	
	
	public Qna updateQna(Long qnaId, String qnaAnswer) {

		Optional<Qna> qna = qnaRepository.findById(qnaId);
		
		Qna newCart = null;
		
		if(qna.isPresent()) {
				
			newCart = qna.get();
			newCart.setQnaAnswer(qnaAnswer);
			newCart.setQnaState("C");
			newCart.setUpdateDate(LocalDateTime.now());
			
			qnaRepository.save(newCart);
		}	
		
		return newCart;
	}
	
	
	public void deleteQna(Long qnaId) {

		qnaRepository.deleteById(qnaId);

	}	
	
	public Long countQna(Long userId) {

		return qnaRepository.countByUserId(userId);

	}
	 
}
