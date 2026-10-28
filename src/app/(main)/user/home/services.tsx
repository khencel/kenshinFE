
export function birthYearArray(date:any){
    return date.split("-") 
}

export function yearAddDigit(year:number,gender:string){
    const yearArr = numToArray(year)
    const firstAdd = addTwoNumbers(Number(yearArr[2]),Number(yearArr[3]))
    const convertDigits = String(firstAdd).padStart(2, "0")
    const firstAddArr = numToArray(convertDigits)
    const secondAdd = addTwoNumbers(Number(firstAddArr[0]),Number(firstAddArr[1])) 
    
    const gua = Math.abs(computeGua(gender,year,secondAdd))
   
    if(String(gua).length === 1){
        return finalResult(gender,gua)
    }else{
        const num = numToArray(gua)
        return finalResult(gender,addTwoNumbers(Number(num[0]), Number(num[1])))
    }
    
}

function numToArray(num:number | string){
    return String(num).split("");
}

function addTwoNumbers(num1:number,num2:number){
    return num1 + num2
}

function computeGua(gender:string,year:number,sumNumber:number){
    let sum = 0;

    if (gender === "male") {
        if (year <= 2000) {
            sum = sumNumber - 10;
        } else {
            sum = sumNumber - 9;
        }
    } else if (gender === "female") {
        if (year <= 2000) {
            sum = sumNumber + 5;
        } else {
            sum = sumNumber + 6;
        }
    }

    return sum;
}

function finalResult(gender:string,num:number){
    
    if(gender === "male"){
        if(num === 5){
            return 2
        }
        return num
        
    }else if(gender === "female"){
        if(num === 5){
            return 8
        }
        return num
    }
}