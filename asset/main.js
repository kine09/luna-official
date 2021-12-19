// header
{
    // on/off menunavbar

    var headerNavBtn = document.querySelector('.header__box2-navBtn')
    var headerBox1 = document.querySelector('.header__box1')

    headerNavBtn.addEventListener('click', ()=>{
        headerBox1.classList.toggle('hide')
        headerBox1.classList.toggle('off')
    })

    // hide / unhide search bar
    var searchBtn = document.querySelector('.search__bar-btn')
    var searchInput = document.querySelector('.search__bar-input')

    searchBtn.addEventListener('click', ()=>{
        searchInput.classList.toggle('off')
    })
}

// form dang ki/ dang nhap

// đói tương validator
{
  function Validator(options) {
    function getParent(element, selector) {
      while (element.parentElement) {
        if (element.parentElement.matches(selector)) {
          return element.parentElement;
        }
        element = element.parentElement;
      }
    }
  
    var selectorRules = {};
  
    // Hàm thực hiện validate
    function Validate(inputElement, rule) {
      var errorrElement = getParent(
        inputElement,
        options.formGroup
      ).querySelector(options.errorSelector);
      var errorrMessage;
  
      // lấy qua các rule của selectort
      var rules = selectorRules[rule.selector];
  
      // lặp qua tưng rules của selector
      // nếu có lỗi dừng kiểm tra
      for (var i = 0; i < rules.length; ++i) {
        switch (inputElement.type) {
          case "radio":
          case "checkbox":
            errorrMessage = rules[i](
              formElement.querySelector(rule.selector + ":checked")
            );
            break;
          default:
            errorrMessage = rules[i](inputElement.value);
        }
        if (errorrMessage) break;
      }
  
      if (errorrMessage) {
        errorrElement.innerText = errorrMessage;
        inputElement.parentElement.classList.add("valid");
      } else {
        errorrElement.innerText = "";
        inputElement.parentElement.classList.remove("valid");
      }
      return !errorrMessage;
    }
  
    //  Lấy element của form cần validate
    var formElement = document.querySelector(options.form);
    if (formElement) {
      // khi submit form
      formElement.onsubmit = function (e) {
        e.preventDefault();
  
        var isFormValid = true;
  
        // lặp qua từng rules và validate
        options.rules.forEach(function (rule) {
          var inputElement = formElement.querySelector(rule.selector);
          var isValid = Validate(inputElement, rule);
          if (!isValid) {
            isFormValid = false;
          }
        });
  
        var enableInputs = formElement.querySelectorAll("[name]:not([disable])");
  
        var formValues = Array.from(enableInputs).reduce(function (
          values,
          input
        ) {
          return (values[input.name] = input.value) && values;
        },
        {});
  
        if (isFormValid) {
          if (typeof options.onsubmit === "function") {
            var enableInputs = formElement.querySelectorAll(
              "[name]:not([disable])"
            );
            var formValues = Array.from(enableInputs).reduce(function (
              values,
              input
            ) {
              values[input.name] = input.value;
              return values;
            },
            {});
            options.onsubmit(formValues);
          } else {
            formElement.submit();
          }
        }
      };
      // lặp qua mỗi rule và xử lý
      options.rules.forEach(function (rule) {
        // lưu lại các rules
        if (Array.isArray(selectorRules[rule.selector])) {
          selectorRules[rule.selector].push(rule.test);
        } else {
          selectorRules[rule.selector] = [rule.test];
        }
  
        var inputElements = formElement.querySelectorAll(rule.selector);
  
        Array.from(inputElements).forEach(function (inputElement) {
          // xử lý khi blur khỏi input
          inputElement.onblur = function () {
            Validate(inputElement, rule);
          };
  
          // xử lý khi nhập vào input
          inputElement.oninput = function () {
            var errorrElement = inputElement.parentElement.querySelector(
              options.errorSelector
            );
            errorrElement.innerText = "";
            inputElement.parentElement.classList.remove("valid");
          };
        });
      });
    }
  }
  
  // Định nghĩa Hàm
  // nguyên tắc các rules
  // 1. khi có lỗi => message lỗi
  // 2. không có lỗi trả về undefined
  Validator.isRequired = function (selector, message) {
    return {
      selector: selector,
      test: function (value) {
        return value ? undefined : message || "Vui lòng nhập trường này";
      },
    };
  };
  
  Validator.isEmail = function (selector, message) {
    return {
      selector: selector,
      test: function (value) {
        var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return regex.test(value)
          ? undefined
          : message || "Trường này phải là email";
      },
    };
  };
  
  Validator.minLength = function (selector, min, message) {
    return {
      selector: selector,
      test: function (value) {
        return value.length >= min
          ? undefined
          : message || `Nhập tối thiểu ${min} ký tự`;
      },
    };
  };
  
  Validator.isConfirm = function (selector, getConfirmValue, message) {
    return {
      selector: selector,
      test: function (value) {
        return value === getConfirmValue()
          ? undefined
          : message || "Giá trị nhập vào chưa đúng";
      },
    };
  };
}

// chuyen tab dang ki/ dang nhap
{
var changeForms = document.querySelectorAll('.form__title-sub')

var modalRegisterForm = document.querySelector('.modal__register')
var modalLoginForm = document.querySelector('.modal__login')

var headerRegisterBtns = document.querySelectorAll('.header__register')
var headerloginBtns = document.querySelectorAll('.header__login')

for(var changeForm of changeForms) {
  changeForm.addEventListener('click', ()=>{
    modalRegisterForm.classList.toggle('hide')
    modalLoginForm.classList.toggle('hide')

  })
}
  //  on/ off modal
var modal = document.querySelector('.modal')
var cancelModalbtns = document.querySelectorAll('.form__cancel')


for(var headerRegisterBtn of headerRegisterBtns) {
  headerRegisterBtn.addEventListener('click',()=>{
    modal.classList.add('unhide')
    modal.classList.remove('hide')
    modalRegisterForm.classList.remove('hide')
    modalLoginForm.classList.add('hide')
  })
}
for(var headerloginBtn of headerloginBtns) {
headerloginBtn.addEventListener('click',()=>{
  modal.classList.add('unhide')
  modal.classList.remove('hide')
  modalRegisterForm.classList.add('hide')
  modalLoginForm.classList.remove('hide')
})
}

for(var cancelModalbtn of cancelModalbtns) {
  cancelModalbtn.addEventListener('click', ()=>{
    modal.classList.remove('unhide')
    modal.classList.add('hide')
  })
}

modal.addEventListener('click', ()=>{
  modal.classList.remove('unhide')
  modal.classList.add('hide')
})

document.querySelector('.modal-wapper').addEventListener('click',(e)=>{
  e.stopPropagation()
})

}
// category
{
  var categoryItems = document.querySelectorAll('.category__item')
  for(var categoryItem of categoryItems) {
    categoryItem.addEventListener('click', function(){
      document.querySelector('.category__item.category__item--active').classList.remove('category__item--active')
      this.classList.add('category__item--active')
    })
  }
}

// sắp sếp theo loại sản phẩm

{
  var categoryItemAll = document.querySelector('.category__item[type="all"]')
  var categoryItemClothes = document.querySelector('.category__item[type="clothes"]')
  var categoryItemWinter = document.querySelector('.category__item[type="winter"]')
  var categoryItemother = document.querySelector('.category__item[type="other"]')
  
  var itemAlls = document.querySelectorAll('.product__item')
  var itemClothess = document.querySelectorAll('.product__item[rule="clothes"]')
  var itemWinters = document.querySelectorAll('.product__item[rule="winter"]')
  var itemOthers = document.querySelectorAll('.product__item[rule="other"]')



  categoryItemAll.addEventListener('click', ()=>{
    for(var itemAll of itemAlls){
      itemAll.parentElement.classList.remove('hide')
    }
  })

  categoryItemClothes.addEventListener('click', ()=>{
    for(var itemAll of itemAlls){
      itemAll.parentElement.classList.add('hide')
    }
    for(var itemClothes of itemClothess){
      itemClothes.parentElement.classList.remove('hide')
    }
  })

  categoryItemWinter.addEventListener('click', ()=>{
    for(var itemAll of itemAlls){
      itemAll.parentElement.classList.add('hide')
    }
    for(var itemWinter of itemWinters){
      itemWinter.parentElement.classList.remove('hide')
    }
  })

  categoryItemother.addEventListener('click', ()=>{
    for(var itemAll of itemAlls){
      itemAll.parentElement.classList.add('hide')
    }
    for(var itemOther of itemOthers){
      itemOther.parentElement.classList.remove('hide')
    }
  })

}

// sắp xếp theo trending

{
  var trendingBtns = document.querySelectorAll('.product__navbar-sort-btn')

  for(var trendingBtn of trendingBtns){
    trendingBtn.addEventListener('click', function(){
      document.querySelector('.product__navbar-sort-btn.btn--active').classList.remove('btn--active')
      this.classList.add('btn--active')
    })
  }
}


