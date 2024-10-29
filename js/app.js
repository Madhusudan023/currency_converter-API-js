const Base_URL = "https://latest.currency-api.pages.dev/v1/currencies";

const dropdown = document.querySelectorAll(".dropdown select");

const btn = document.querySelector("button");

const errorMsg = document.querySelector(".error-msg");

const fromCurr = document.querySelector(".from select");

const toCurr = document.querySelector(".to select");

const ConversionMsg = document.querySelector(".Conversion-msg");




for (let select of dropdown) {
    for (let currcode in countryList) {
        let newOption = document.createElement("option");

        newOption.innerText = currcode;

        newOption.value = currcode; 

        select.append(newOption);

        if(select.name==="From" && currcode==="USD"){
            newOption.selected="selected";
        }

        else if(select.name==="To" && currcode==="INR"){
            newOption.selected="selected";
        }

        select.append(newOption);
        
    }

    select.addEventListener("change", function(evt){
        updateFlag(evt.target);
        
        
    })

}



const updateFlag = function(element){
    let currcode = element.value;
    let countryCode = countryList[currcode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
        img.src=newSrc;

    
    
    

}

btn.addEventListener("click", async function  (evt) {
    evt.preventDefault();

    let amount = document.querySelector(".amount input");

    let amountValue = amount.value;
    if(amountValue === "" || isNaN(amountValue) || Number(amountValue) < 0  || amountValue == String)
    {
        errorMsg.innerText = `ERROR !! ${amountValue} is not valid Number`;
        amount.value= 1; 
        
        amount.style.borderColor="#ff0000b8";
        
    }
    else{
        amount.style.borderColor="#798071";
        errorMsg.innerText = " ";
    }
    
    const URL = `${Base_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    console.log(data);
    let rate = data[fromCurr.value.toLowerCase()]
    let result = rate[toCurr.value.toLowerCase()];

    let convesion = result*amount.value;

    console.log(convesion);

    ConversionMsg.innerText=`${amount.value} ${fromCurr.value} = ${convesion} ${toCurr.value}`;

});

