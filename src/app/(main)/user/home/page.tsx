"use client"
import { GUA_DIRECTIONS, convertNumberToGua, GuaDetails } from "@/constants/GuaList"
import { useState } from "react";
import { birthYearArray, yearAddDigit } from "./services";
import Chart from "./chart";


export default function Home(){
    const [birthDate,setbirthDate] = useState("")
    const [gender, setGender] = useState("")
    const [gua,setGua] = useState<number | null>(null)
    const [guaInfo, setGuaInfo] = useState<typeof GUA_DIRECTIONS[keyof typeof GUA_DIRECTIONS] | null>(null)
    const [guaName, setGuaName] = useState("")
    const [details, setDetails] = useState<ReturnType<typeof GuaDetails>[keyof ReturnType<typeof GuaDetails>] | null>(null);
    
    const handleSubmit = () => {
        const dateArr = birthYearArray(birthDate);
        const details = GuaDetails()
        const guaNumber = yearAddDigit(dateArr[0],gender)
        const res = convertNumberToGua(Number(guaNumber));
        setGuaName(res ?? "")
        setGuaInfo(res ? GUA_DIRECTIONS[res as keyof typeof GUA_DIRECTIONS] : null)
        setGua(guaNumber ?? null)

        const guaDetails = res as keyof typeof details;
        setDetails(details[guaDetails])
        console.log(details);
        
    }

    return (
        <>
        <div style={{marginTop:"6%"}}>
            <div className="mb-2">
                Date of Birth:
                <input 
                    type="date"
                    value={birthDate}
                    onChange={(e)=>setbirthDate(e.target.value)} 
                />
            </div>
            <div className="mb-2">
                <select
                    value={gender}
                    onChange={(e)=>setGender(e.target.value)}
                >
                    <option value="" hidden>Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>
            <div className="row m-0">
                <div className="col border">
                    Gua number:{gua}
                    <br />
                    East:{guaInfo?.east.value}
                    <br />
                    North:{guaInfo?.north.value}
                    <br />
                    NorthEast:{guaInfo?.northEast.value}
                    <br />
                    NorthWest:{guaInfo?.northWest.value}
                    <br />
                    South:{guaInfo?.south.value}
                    <br />
                    SouthEast{guaInfo?.southEast.value}
                    <br />
                    SouthWest:{guaInfo?.southWest.value}
                    <br />
                    West:{guaInfo?.west.value}
                </div>
                <div className="col border">
                    <div className="row">
                        <div className="col">
                            Element:{details?.element}
                            <br />
                            Number:{details?.number}
                            <br />
                            Direction:{details?.direction}
                            <br />
                            People:{details?.people}
                            <br />
                            Body Parts:{details?.bodyParts}
                            <br />
                            Sickness:{details?.Sickness}
                            <br />
                            Colour:{details?.colour}
                        </div>
                        <div className="col">
                            {/* <Chart /> */}
                        </div>
                    </div>
                    
                 
                </div>
            </div>
            <br />
            <button onClick={handleSubmit}>Submit</button>
        </div>
        </>
    )
}