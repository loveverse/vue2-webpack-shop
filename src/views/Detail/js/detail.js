export default function DetailLoading() {
  //保存当前缩略图的下标
  let magnifierImgID = 0;
  //当前的商品数量
  let goodsChangeNum = 1;

  // 1.放大镜效果
  magnifier()

  function magnifier() {
    //模拟数据后台加载 数据中每一个对象是一个图片的大图和小图
    let imgsrc = goodDate.imgsrc;
    //修改放大镜的图片变为动态加载
    //获取放大镜效果的小图
    let oJqzoomImg = document.querySelector(".jqzoom img");
    //设置图片src
    oJqzoomImg.src = imgsrc[magnifierImgID].s;


    //获取外层元素
    let oPreview = document.querySelector(".con .mainCon .previewWrap .preview");
    // 获取小图元素
    let oJqzoom = document.querySelector(".con .mainCon .previewWrap .preview .jqzoom");
    let oMask = null; //初始化蒙版元素
    let oMaxBox = null; //初始化大图外层
    let oMaxImg = null; //初始化大图


    //当放大镜的外层被鼠标移入触发
    oPreview.onmouseenter = function (ev) {
      //判断蒙版是否已经存在
      if (!oMask) {
        //创建蒙版
        oMask = document.createElement("div");
        //给蒙版以添加类名，类名样式书写在css中
        oMask.className = "mask";
        //插入蒙版
        oJqzoom.appendChild(oMask);
      }
      if (!oMaxBox) {
        //创建大图外层
        oMaxBox = document.createElement("div");
        //添加样式
        oMaxBox.className = "maxbox";
        // 插入大图
        oPreview.appendChild(oMaxBox);
        //创建图片
        oMaxImg = new Image();
        // oMaxImg.src = "./images/b1.png";
        //当创建大图的时候，根据当前小图的src 获取大图的对应的src
        oMaxImg.src = imgsrc[magnifierImgID].b;


        // 大图插入大图外层
        oMaxBox.appendChild(oMaxImg);
      }
      // 鼠标移动事件
      oPreview.onmousemove = function (e) {
        //获取蒙版left 和 top 的位置
        var maskPosition = {
          left: e.clientX - oMask.offsetWidth / 2 - oJqzoom
            .getBoundingClientRect().left,
          top: e.clientY - oMask.offsetHeight / 2 - oJqzoom
            .getBoundingClientRect().top,
        }
        //判断临界值
        if (maskPosition.left <= 0) {
          maskPosition.left = 0;
        } else if (maskPosition.left >= oJqzoom.clientWidth - oMask.offsetWidth) {
          maskPosition.left = oJqzoom.clientWidth - oMask.offsetWidth;
        }
        if (maskPosition.top <= 0) {
          maskPosition.top = 0;
        } else if (maskPosition.top >= oJqzoom.clientHeight - oMask.offsetHeight) {
          maskPosition.top = oJqzoom.clientHeight - oMask.offsetHeight;
        }

        //对蒙版赋值
        oMask.style.left = maskPosition.left + "px";
        oMask.style.top = maskPosition.top + "px";

        //计算比例：（蒙版可以移动的距离 /  大图能够被移动的距离）
        var scale = (oJqzoom.clientWidth - oMask.offsetWidth) / (oMaxImg.offsetWidth -
          oMaxBox.clientWidth);
        //计算大图移动的位置
        var maxPosition = {
          left: maskPosition.left / scale,
          top: maskPosition.top / scale
        }
        oMaxImg.style.marginTop = -maxPosition.top + "px";
        oMaxImg.style.marginLeft = -maxPosition.left + "px";
      }
      //鼠标离开函数
      oPreview.onmouseleave = function () {
        //移除DOM节点
        oJqzoom.removeChild(oMask);
        oPreview.removeChild(oMaxBox);
        //初始化为null
        oMask = null;
        oMaxBox = null;
        oMaxImg = null;
        //解绑事件
        oPreview.onmousemove = null;
        oPreview.obmouseleave = null;
      }
    }
  }

  //2.缩略图效果
  thumbnail();

  function thumbnail() {

    //进行移动动画的容器
    let oScrollDiv = document.querySelector(".specScroll .items .itemsCon");

    //动态生成缩略图数据
    goodDate.imgsrc.forEach(function (item, index) {
      let oImg = new Image();
      oImg.src = item.s;
      oScrollDiv.appendChild(oImg);
    })


    //移动容器里的集合
    let oScrollItems = document.querySelectorAll(".specScroll .items .itemsCon img");
    // 获取左右按钮
    let oNext = document.querySelector(".specScroll .next");
    let oPrev = document.querySelector(".specScroll .prev");

    let tempLength = 0; //临时变量,当前移动的长度
    let viewNum = 5; //获取每次显示图片的个数量
    let moveNum = 2; //每次移动的数量
    //计算每次移动的长度（ 每个元素的宽度*要移动的数量）
    let moveLength = oScrollItems[0].offsetWidth * moveNum;
    //计算总可以移动的长度（总共可以移动的数量 * 单个长度）
    let countLength = (oScrollItems.length - viewNum) * oScrollItems[0].offsetWidth;

    //添加动画过渡
    oScrollDiv.style.transition = "all .5s"


    //下一张按钮事件
    oNext.onclick = function () {
      //如果已经走过去的距离 小于  总共可以总动的长度 才可以继续走
      if (tempLength < countLength) {
        // 如果剩余可以走的长度 如果大于 每次移动的长度，则每次就走该走的长度
        // 否则直接走到最后即可
        if ((countLength - tempLength) > moveLength) {
          tempLength += moveLength;
          oScrollDiv.style.left = -tempLength + "px";
        } else {
          tempLength += (countLength - tempLength);
          oScrollDiv.style.left = -tempLength + "px";
        }
      }
    }

    //上一张按钮事件
    oPrev.onclick = function () {
      // 如果可以走的距离还大于0，则走该走的长度
      // 否则直接等于0
      if (tempLength >= 0) {
        if (tempLength > moveLength) {
          tempLength -= moveLength;
          oScrollDiv.style.left = -tempLength + "px";
        } else {
          tempLength = 0;
          oScrollDiv.style.left = tempLength + "px";

        }
      }
    }
  }

  //3.缩略图点击效果
  thumbnailClick();

  function thumbnailClick() {
    //获取每一张图片
    let oScrollItems = document.querySelectorAll(".specScroll .items .itemsCon img");
    //获取放大镜效果的小图
    let oJqzoomImg = document.querySelector(".jqzoom img");
    //多所有的图片绑定点击事件
    for (let i = 0; i < oScrollItems.length; i++) {
      oScrollItems[i].onclick = function () {

        magnifierImgID = i;
        oJqzoomImg.src = this.src;
      }
    }
  }

  //4.商品筛选详情
  screening();

  function screening() {
    let oChoose = document.querySelector('.InfoWrap .choose');
    let oChooseDetail = document.querySelector('.InfoWrap .choose .chooseArea');
    let crumbData = goodDate.goodsDetail.crumbData;
    //利用dom动态添加元素 遍历crumbData数据生成dl和dt
    for (let i = 0; i < crumbData.length; i++) {
      // 创建dl dt 元素，并给dt赋值，给dt设置类名
      let oDl = document.createElement('dl');
      let oDt = document.createElement('dt');
      oDt.className = "title";
      oDt.innerHTML = crumbData[i].title;
      //把dt插入到dl中
      oDl.appendChild(oDt);
      //遍历每一个列表中的data 生成dd
      for (var j = 0; j < crumbData[i].data.length; j++) {
        //生成dd
        let oDd = document.createElement("dd");
        //给dd添加自定义属性 保存价钱的修改 
        oDd.setAttribute("changePirce", crumbData[i].data[j].changePrice)
        //给dd插入内容
        oDd.innerHTML = crumbData[i].data[j].type;
        // 把dd插入到dl中
        oDl.appendChild(oDd);
      }
      // 把dl插入到choose中
      oChooseDetail.appendChild(oDl);
    }


    let oChoosed = document.querySelector('.InfoWrap .choose .chooseArea .choosed');
    //获取外层dl标签
    let oDl = oChooseDetail.getElementsByTagName('dl');
    //定义数组，数组中保存筛选条件，需要的时候按顺序保存和获取里边的条件
    //并且保证只有4个值，当组数据更换的时候直接替换原有位置的值    
    let arr = [];
    //先将数组中存放oDl.length个0，方便接下来按dl的顺序存放数据
    for (let i = 0; i < oDl.length; i++) {
      arr.push(0);
    }

    //遍历所有的dl标签
    for (let i = 0; i < oDl.length; i++) {
      //给每一个dl扩展一个prevNode属性，用来记录点击的dd标签
      oDl[i].prevNode = null;
      //记录每一个dl的下标
      oDl[i].index = i;
      // 获取每一个dl中的所有dd标签
      let oDd = oDl[i].getElementsByTagName('dd');
      //遍历当前dl的所有的dd标签
      for (let j = 0; j < oDd.length; j++) {
        // 给当前遍历到的dl中的所有dd绑定点击事件
        oDd[j].onclick = function () {
          //获取当前点击a标签所在的dl
          let parent = this.parentNode;

          //点击前先清空所有颜色
          for (let j = 0; j < oDd.length; j++) {
            oDd[j].style.color = "#666";
          }

          //把当前点击的元素设置颜色为红色
          this.style.color = 'red';

          // 在数组对应的位置替换上当前选中的值
          arr[parent.index] = this;
          //清空之前的盛放选中值的容器
          oChoosed.innerHTML = '';

          priceSum(arr);

          //每次点击的时候重新遍历整个盛放数据的数组 渲染元素
          for (let i = 0; i < arr.length; i++) {
            //只有当arr[i]的值不为0时，也即与下标对应的第i个li中有被选中的时候才执行下面的代码
            if (arr[i]) {
              //检测数组，每次创建了mark元素
              let oChomark = document.createElement('mark');
              // 每次把在mark元素中放入响应的数据
              oChomark.innerHTML = arr[i].innerHTML;
              // 创建a标签 用来删除
              let oCxa = document.createElement('a');
              oCxa.innerHTML = 'X';
              //给a标签设置一个自定义属性，用来将来删除的时候，判断删除的是哪一个
              oCxa.setAttribute('name', i);
              oChomark.appendChild(oCxa);
              oChoosed.appendChild(oChomark);
            }
          }
          //设置parent就是当前dl  dl的preNode属性保存这次点击的dl中的dd
          parent.prevNode = this;


          //点击删除功能
          //初始化一个代表当前点击元素下标变量的默认值
          let num = 0;
          // 获取所有的mark中的a标签
          let ChoseA = oChoosed.querySelectorAll('mark a');
          for (let i = 0; i < ChoseA.length; i++) {
            ChoseA[i].index = i;
            // 对所有的a绑定点击事件
            ChoseA[i].onclick = function () {
              // 获取当前点击的a是哪一个dl的  之前设置过自定义属性
              num = parseInt(this.getAttribute(
                'name')); //得到删除a标签在第几个li中（记得将字符串格式转化为数字格式）
              // 移除当前点击a标签的父级mark元素
              this.parentNode.remove();
              //让当前点击的dl中的dd颜色清除
              oDl[num].prevNode.style.color = '';
              oDl[num].querySelector("dd:nth-of-type(1)").style.color = 'red';
              // 让当前点击的a对应的dl在数组数据中为空
              arr[num] = 0; //让删除的元素在数组中对应下标的值变为0

              priceSum(arr)
            }
          }
        }
      }
    }
    // 计算价钱函数
    function priceSum(arr) {
      //根据当前数组中的值重新计算价钱
      //初始化默认价钱
      let newPrice = goodDate.goodsDetail.price * goodsChangeNum;
      arr.forEach(function (item, index) {
        if (item) {
          newPrice += parseInt(item.getAttribute("changePirce")) * goodsChangeNum;
        }
      })
      let oPrice = document.querySelector(".price em");
      oPrice.innerHTML = newPrice;

      //改变搭配选择的价钱
      let choosePrice = document.querySelector(".good-suits .master p");
      choosePrice.innerHTML = "¥" + newPrice;
      //改变搭配总价钱
      let oChooseAllPrice = document.querySelector(".good-suits .result .price");
      let chooseAllPrice = newPrice;
      let oChooseAllCheckBoxs = document.querySelectorAll(
        ".good-suits .suits input[type=checkbox]");
      oChooseAllCheckBoxs.forEach(function (item, index) {
        if (item.checked) {
          chooseAllPrice += parseInt(item.value)
        }
      })
      oChooseAllPrice.innerHTML = "¥" + chooseAllPrice;
    }
  }

  //5.商品数量交互
  goodsNum();

  function goodsNum() {
    let oPlus = document.querySelector(
      ".outer .con .mainCon .InfoWrap .choose .cartWrap .controls .plus");
    let oMins = document.querySelector(
      ".outer .con .mainCon .InfoWrap .choose .cartWrap .controls .mins");
    let oItxt = document.querySelector(
      ".outer .con .mainCon .InfoWrap .choose .cartWrap .controls .itxt");
    //设置默认数量
    oItxt.value = goodsChangeNum;
    // 默认数量
    let num = 1;
    oItxt.value = num;
    oPlus.onclick = function () {
      goodsChangeNum++;
      oItxt.value = goodsChangeNum;

      //当价钱改变的时候 获取当前价钱 然后计算总价赋值
      let oPrice = document.querySelector(".price em");
      // 原来的价钱/原来的数量 得到一个的价钱，再乘以当前改变后的数量
      let finalPrice = oPrice.innerHTML / (goodsChangeNum - 1) * goodsChangeNum;
      oPrice.innerHTML = finalPrice;
      changeFittingPrice(finalPrice)
    }
    oMins.onclick = function () {
      if (goodsChangeNum > 1) {
        goodsChangeNum--;
        oItxt.value = goodsChangeNum;
        let oPrice = document.querySelector(".price em");
        let finalPrice = oPrice.innerHTML / (goodsChangeNum + 1) * goodsChangeNum;
        oPrice.innerHTML = finalPrice;
        changeFittingPrice(finalPrice)
      }

    }
    // 改变搭配价钱函数
    function changeFittingPrice(finalPrice) {
      //改变搭配选择的价钱
      let choosePrice = document.querySelector(".good-suits .master p");
      choosePrice.innerHTML = "¥" + finalPrice;
      //改变搭配总价钱
      let oChooseAllPrice = document.querySelector(".good-suits .result .price");
      let chooseAllPrice = finalPrice;
      let oChooseAllCheckBoxs = document.querySelectorAll(
        ".good-suits .suits input[type=checkbox]");
      oChooseAllCheckBoxs.forEach(function (item, index) {
        if (item.checked) {
          finalPrice += parseInt(item.value)
        }
      })
      oChooseAllPrice.innerHTML = "¥" + finalPrice;
    }
  }

  //6.路径导航动态生成
  pathURL();

  function pathURL() {
    // goodDate.path = ["手机、数码、通讯", "手机", "Apple苹果", "iphone 6S系类"];
    let oConPoin = document.querySelector(".conPoin");
    goodDate.path.forEach(function (item, index) {
      let oA = document.createElement("a");
      if (index == goodDate.path.length - 1) {
        oA.innerHTML = item.title;
        oConPoin.appendChild(oA);
      } else {
        oA.href = item.url;
        oA.innerHTML = item.title;
        oConPoin.appendChild(oA);
      }
    })
  }

  //7.商品详情的数据动态生成
  goodsDetail();

  function goodsDetail() {
    let goodsCon = goodDate.goodsDetail;
    let oGoodsDetail = document.querySelector(".con .mainCon .InfoWrap .goodsDetail");
    let oGoodsDetailContent = `<h3 class="InfoName">${goodsCon.title}</h3>
              <p class="news">${goodsCon.recommend}</p>
              <div class="priceArea">
                  <div class="priceArea1">
                      <div class="title">价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格</div>
                      <div class="price">
                          <i>¥</i>
                          <em>${goodsCon.price}</em>
                          <span>降价通知</span>
                      </div>
                      <div class="remark">
                          <i>累计评价</i>
                          <em>${goodsCon.evaluateNum}</em>
                      </div>
                  </div>
                  <div class="priceArea2">
                      <div class="title">
                          <i>促&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销</i>
                      </div>
                      <div class="fixWidth">
                          <i class="red-bg">${goodsCon.promoteSales.type}</i>
                          <em
                              class="t-gray">${goodsCon.promoteSales.content}</em>
                      </div>
                  </div>
              </div>
              <div class="support">
                  <div class="supportArea">
                      <div class="title">支&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;持</div>
                      <div class="fixWidth">${goodsCon.support}</div>
                  </div>
                  <div class="supportArea">
                      <div class="title">配 送 至</div>
                      <div class="fixWidth">${goodsCon.address}</div>
                  </div>
              </div>`;

    oGoodsDetail.innerHTML = oGoodsDetailContent;

  }


  //8.选项卡切换的封装
  function Tab(btn, Content) {
    this.tabBtn = btn;
    this.tabDiv = Content;
    for (let i = 0; i < this.tabBtn.length; i++) {
      this.tabBtn[i].index = i;
      let _this = this; //this指向的是var tab = new Tab() ，即tab这个对象，注意是对象。
      this.tabBtn[i].onclick = function () {
        _this.clickBtn(
          this); //这句话里面的_this指向的是var tab = new Tab()构造函数这个对象，括号里面的this指向的点击事件对应的这个对象，这里的指的是input这个标签
      };
    }
  }
  Tab.prototype.clickBtn = function (btn) {
    for (let k = 0; k < this.tabBtn.length; k++) {
      this.tabBtn[k].className = ''; //clickBtn这个方法里面的this指向的是var tab = new Tab() ，即tab这个对象
      this.tabDiv[k].style.display = 'none';
    }
    btn.className = 'active';
    this.tabDiv[btn.index].style.display = 'block';
  }


  //9.侧边栏选项卡切换交互
  asideNav();

  function asideNav() {
    let oTabBtn = document.querySelectorAll(".tabWraped h4");
    let oTabPane = document.querySelectorAll(".tabContent .tab-pane");
    new Tab(oTabBtn, oTabPane)
  }

  //10.选择搭配价钱
  fittingPrice();

  function fittingPrice() {

    let oChooseAllPrice = document.querySelector(".good-suits .result .price");
    let oChooseAllCheckBoxs = document.querySelectorAll(".good-suits .suits input[type=checkbox]");
    //对所有的多选框绑定事件 只要多选框状态发生改变就会触发
    oChooseAllCheckBoxs.forEach(function (item, index) {
      item.onchange = function () {
        let oChoosePrice = document.querySelector(".good-suits .master p");
        let choosePrice = parseInt(oChoosePrice.innerHTML.substr(1));
        oChooseAllCheckBoxs.forEach(function (item, index) {
          console.log(item)
          if (item.checked) {
            choosePrice += parseInt(item.value)
          }
        })
        oChooseAllPrice.innerHTML = "¥" + choosePrice;

      }
    })
  }

  //11.详情页评论区TAB切换功能
  intro();

  function intro() {
    let oTabWrap = document.querySelector(".intro");
    let oTabBtn = oTabWrap.querySelectorAll(".intro .tab-wraped li");
    let oTabPane = oTabWrap.querySelectorAll(".intro .tab-content .tab-pane");
    new Tab(oTabBtn, oTabPane)
  }

  //12.侧边栏效果
  asideShow();

  function asideShow() {
    var pull = document.getElementsByClassName('pull');
    var tabtext = document.getElementsByClassName('tab-text');
    var tabico = document.getElementsByClassName('tab-ico');
    for (var i = 0; i < pull.length; i++) {
      (function (n) {
        pull[n].onmouseover = function () {
          tabtext[n].style.left = "-59px";
          tabico[n].style.backgroundColor = "#c81623";
          tabtext[n].style.backgroundColor = "#c81623";
          //				alert(text[n].backgroundColor);
        }
        pull[n].onmouseleave = function () {
          tabtext[n].style.left = "35px";
          tabico[n].style.backgroundColor = "#7a6e6e";
          tabtext[n].style.backgroundColor = "#7a6e6e";

        }
      })(i);
    }
    /*
      侧边栏按钮
    */
    var bnt = document.getElementsByClassName('but')[0];
    var toolbar = document.getElementsByClassName('toolbar')[0];
    bnt.onmousedown = function () {
      if (bnt.className == 'but list') {
        //		alert("hehehe");
        toolbar.className = "toolbar toolbar-out";
        bnt.className = "but pull-wrap";
      } else {
        toolbar.className = "toolbar toolbar-wrap";
        bnt.className = "but list";
      }
    }
  }

  //加入购物车功能
  addCart();

  function addCart() {
    let addShopCart = document.querySelector(
      ".outer .con .mainCon .InfoWrap .choose .cartWrap .add a");
    addShopCart.onclick = function () {
      let goodPrice = parseInt(document.querySelector(
        ".outer .con .mainCon .InfoWrap .priceArea .priceArea1 .price em")
        .innerHTML);
      let goodTitle = document.querySelector(".outer .con .mainCon .InfoWrap .InfoName")
        .innerHTML;
      let goodNum = document.querySelector(
        ".outer .con .mainCon .InfoWrap .choose .cartWrap .controls .itxt").value;
      let goodImg = "./images/goods1.png";
      let goodTxt = "国民最爱";

      //存入localStorage
      let goodCon = {
        goodPrice,
        goodTitle,
        goodNum,
        goodImg,
        goodTxt
      }

      localStorage.setItem("goodCon", JSON.stringify(goodCon));
      location.href = "./cart.html";
    }
  }
}