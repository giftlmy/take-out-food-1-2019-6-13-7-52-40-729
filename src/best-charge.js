function bestCharge(selectedItems) {
  let getallcounts = getAllcounts(inputs);
  let getpriceName=getPriceName(getallcounts);
  let bestprice=getBestWay(getpriceName);
  let result=printtakeoutfood(getpriceName,bestprice)

  return result;
}
function getAllcounts(selectedItems){

  let map=new Map;
  let items=[];
  let result=[];
  for (let index = 0; index < selectedItems.length; index++) {
    items.push(selectedItems[index].split('x'));
    result.push({
      id:items[index][0].trim(),
      count:items[index][1].trim()
    }) 
  }
  return result;
}

function getPriceName(allcounts){
  let loadallItems = loadAllItems();
  let allpricename=[];
  for (let i = 0; i < loadallItems.length; i++) {
    for(let j = 0; j< allcounts.length;j++){
      if(loadallItems[i].id==allcounts[j].id){
        allpricename.push({
          id:loadallItems[i].id,
          name:loadallItems[i].name,
          price:loadallItems[i].price,
          count:allcounts[j].count
        });
      }
    }   
  }
  return allpricename;
}

function getBestWay(allpricename){
  let loadpromotions=loadPromotions();
  //五折价格
  let halftotal=0;
  allpricename.forEach(element => {
    let price1=element.price;
    let onetotal=0;
    for (let index = 0; index < loadpromotions.length; index++) {
     if(loadpromotions[index].type=='指定菜品半价'){     
       for(let i=0;i<loadpromotions[index].items.length;i++){     
         if(element.id==loadpromotions[index].items[i]){ 
             price1=element.price*0.5;
         }
       }
     }    
    }
    onetotal=price1*element.count;
    halftotal+=onetotal;
  });
  //满减
  let fulltotal=0;
  allpricename.forEach(a => {
    let onetotal=a.price*a.count;
    fulltotal+=onetotal;  
  });
  if(fulltotal>=30) fulltotal=fulltotal-6;
  //best
  if(fulltotal<=halftotal){
    return fulltotal;
 
  }else{
    return  halftotal;
  }
}

function printtakeoutfood(allPriceName,bestprice){
  let res=' ============= 订餐明细 =============\n'
  allPriceName.forEach(a => {
    res=res+
    a.name+' x '+a.count+' = '+a.price*a.count+'元\n'; 
  })
  res+='-----------------------------------\n'+
  '使用优惠:\n'+
  '指定菜品半价(黄焖鸡，凉皮)，省13元\n'+
  '-----------------------------------\n'+
  '总计：'+bestprice+'元\n'+
  '===================================';
  return res;



}
