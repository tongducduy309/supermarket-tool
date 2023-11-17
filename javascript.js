// import items from './items.json' assert { type: "json" };
var view = [],itemsG=[],n=0;
function getItem(item){
    var col = document.createElement('div');
    
    col.className = "col-6 col-sm-3 col-md-3 col-lg-2";
    var ite = document.createElement('div');
    ite.className="item";
    var img = document.createElement('img');
    img.alt="Hình mẫu";
    var name = document.createElement('span');
    name.className="name";
    var price = document.createElement('div');
    var span = document.createElement('span');
    price.className="price";
    span.className="price";
    price.appendChild(span)

    img.src = item["img"][item["type"][0]];

    name.innerHTML = item["name"]

    span.innerHTML = item["price"]

    if (item["priceSale"]){
        var priceSale = document.createElement('span');
        priceSale.className="priceSale";
        priceSale.innerHTML = item["priceSale"];
        price.appendChild(priceSale);
    }

    ite.appendChild(img)
    ite.appendChild(name)
    ite.appendChild(price)
    col.appendChild(ite)
    return col

}
function getItems(items){
    
    
    const contain = document.getElementById("contain");
    contain.innerHTML="";
    view = []
    if (items.length>0)
        {
            let row= document.createElement('div');
            row.className="row";
            items.forEach(item => {
                if (!item["id"])item["id"] = n;
                if (!item["trademark"])item["trademark"] = "Đang cập nhật";
               
                if (!item["priceSale"])item["priceSale"] = "";
                var ite = getItem(item);
                row.appendChild(ite);
                ite.onclick = function(){
                    openFormItem(item)
                }
                view.push(item);
                n++;
                }
            );
            contain.appendChild(row);
            itemsG = items;
        }
    else{
        contain.innerHTML=`
        <div style="width:100%;text-align:center">
            <h2 style="color: #d7886d;">Chưa có sản phẩm trên kệ</h2>
        </div>
        `
    }

}

function openFormItem(item){
    let img = document.querySelector(".formItem .img img");
    let name = document.querySelector(".formItem .nameForm");
    let price = document.querySelector(".formItem .priceForm");
    let priceSale = document.querySelector(".formItem .priceSaleForm");
    let trademark = document.querySelector(".formItem .trademark .content");
    let decription = document.querySelector(".formItem .description .text");
    let types = document.querySelector(".formItem .type .row");
    types.innerHTML="";
    
    name.innerHTML= item["name"];
    price.innerHTML= item["price"];
    priceSale.innerHTML= item["priceSale"];
    trademark.innerHTML= item["trademark"];
    decription.innerHTML= item["description"][item["type"][0]];
    let imgDefault='';

    item["type"].forEach((ite,index) => {
        let colItem = document.createElement("div");
        colItem.className="col-6 col-sm-6 col-md-4";
        let itemType = document.createElement("div");
        itemType.className="itemType";
        if (index==0) {
            itemType.classList.add("activeType");
            imgDefault = item["img"][ite];
        }
        let span = document.createElement("span");
        span.innerHTML = ite;
        itemType.appendChild(span);
        itemType.onclick = function(){
            if (itemType.className.indexOf("activeType")==-1){
                let imgPath=item["img"][ite];
                if (!item["img"][ite]) imgPath=imgDefault;
                changeTypeItem({index:index,img:img,imgPath:imgPath,decription:decription,decriptionText:item["description"][ite]})
            }
            
        }
        colItem.appendChild(itemType);
        types.appendChild(colItem);
    });
    img.src = imgDefault;
    document.getElementById("detail").style.visibility="visible";
}

function changeTypeItem({index,img=null,imgPath='',decription=null,decriptionText='Đang cập nhật'}){
    img.src=imgPath;
    decription.innerHTML=decriptionText;
    let itemsType = document.querySelectorAll(".formItem .type .row .itemType");
    
    itemsType.forEach((type,i) => {
        if (i!=index)  type.classList.remove("activeType")
        else {
            type.classList.add("activeType");
        }
    });
}

function search(key){
    if (key!='all') view =itemsG.filter((p={name:String})=>p.name.toUpperCase().indexOf(key.toUpperCase())>-1);
    getItems(view)
}

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      document.getElementById("scrollToTop").classList.add("active");
    } else {
      document.getElementById("scrollToTop").classList.remove("active");
    }
  }




$(document).ready(
    
    
    function(){
        
        fetch('./items.json')
        .then((response) => response.json())
        .then((json) => getItems(json))
        scrollFunction()
        $('.button-search').click(
            function(){
                var key = document.getElementById("input_search").value;
                search(key);
            }
        )

        $('.formItem .close').click(
            function(){
                document.getElementById("detail").style.visibility="hidden";
            }
        )
    }
    
)