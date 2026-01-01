
/**
 * localStorage관련 서비스
 */

export const storageService = {
  getItem(key: string) {
    return unencrypt( localStorage.getItem(key) );
  },

  setItem(key: string, value: string) {

    var encryptValue = encrypt(value);
    if(encryptValue == undefined)
      return;
    return localStorage.setItem(key, encryptValue );
  },

  removeItem(key: string) {
    return localStorage.removeItem(key);
  },

  clear() {
    return localStorage.clear();
  },

  checkCart(productId: number) {
    const cart = storageService.getItem('cart-brickground');
    if (!cart) return false;
    const cartItems = JSON.parse(
      storageService.getItem('cart-brickground') as string,
    );
    if (cartItems.includes(productId)) return true;

    return false;
  },
};


const encrypt = (theText: string) => {

  if(theText == undefined || theText == null)
    return undefined;

  var output = '';
  var Temp = new Array();
  var Temp2 = new Array();
  var TextSize = theText.length;

  for (var i = 0; i < TextSize; i++) {
    var rnd = Math.round(Math.random() * 122) + 68;
    Temp[i] = theText.charCodeAt(i) + rnd;
    Temp2[i] = rnd;
  }

  for (i = 0; i < TextSize; i++) {
    output += String.fromCharCode(Temp[i], Temp2[i]);
  }

  return output;
};

const unencrypt = (theText)  => {

  if(theText == undefined || theText == null)
    return undefined;

  var output = '';
  var Temp = new Array();
  var Temp2 = new Array();
  var TextSize = theText.length;

  for (var i = 0; i < TextSize; i++) {
    Temp[i] = theText.charCodeAt(i);
    Temp2[i] = theText.charCodeAt(i + 1);
  }

  for (i = 0; i < TextSize; i = i+2) {
    output += String.fromCharCode(Temp[i] - Temp2[i]);
  }

  return output;
};
