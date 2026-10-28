import { getNoOfLoopYear } from "./chartServices"

export default function Chart(){
    console.log(getNoOfLoopYear());
    
    return (
        <> 
            <div className="row">
                <div className="col-4 border">2</div>
                <div className="col-4 border">3</div>
                <div className="col-4 border">4</div>
                <div className="col-4 border">5</div>
                <div className="col-4 border">6</div>
                <div className="col-4 border">7</div>
                <div className="col-4 border">8</div>
                <div className="col-4 border">9</div>
                <div className="col-4 border">1</div>
            </div>
        </>
    )
}