import axios from "axios";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";

const SearchFilter = ({ onFilter }) =>{
  
  const [locality, setLocality] = useState('');
  // const [price, setPrice] = useState('');
  let [bhk, setBHK] = useState('');

    let [houseData,setHouseData] = useState([]);
    let navigate = useNavigate();
   
    useEffect(()=>{
      
      let fetchData = async() =>{
        // USING BACK END Server
       console.log("env"+process.env.REACT_APP_BACKEND_URL);
       let response = await axios.get(process.env.REACT_APP_BACKEND_URL+"houses");
       console.log(response);
       setHouseData(response.data);


      }
      fetchData();
    },[])
    

  const handleSubmit = (event) => {
    event.preventDefault();
    // onFilter({ locality, bhk });
    if(!bhk)
    bhk="0";
    navigate('/searchresults/'+ locality+"/"+bhk,{state:{'housesData':houseData}});
  }
    // get distinct counties from houseData
    // get housedata. got from props.
    // get counties from each element in array element
    if (!houseData) {
        return <h1>....loading</h1>
    } 
    
    let arrWithDupeCounties = houseData.map((elem) => {return elem.locality})
    let arrWithDupeBHK = houseData.map((elem) => {return elem.BHK})

    // using set to remove duplicates
    const uniqueCounties=Array.from(new Set (arrWithDupeCounties));
    const uniqueBHK=Array.from(new Set (arrWithDupeBHK)).sort();
  

    // const handleFilter = (filterCriteria) => {
    //   const { locality, price } = filterCriteria;
    
    //   // Function to parse the price range option into numeric values
    //   const parsePriceRange = (priceRange) => {
    //     if (priceRange.startsWith('<1000')) {
    //       return { min: 0, max: 1000 }; // Assuming "Under $1000"
    //     } else if (priceRange.startsWith('>1000and<2000')) {
    //       return { min: 1001, max: 2000 }; // Assuming "Over $3000"
    //     } else if (priceRange.includes('>2000and<3000')) {
    //       return { min: 2001, max: 3000 };
    //     }
    //     else if (priceRange.includes('>3000')) {
    //       return { min: 30001, max: Infinity };
    //     }
    //     // Default case if no match (you might want to handle this differently)
    //     return { min: 0, max: Infinity };
    //   };
    
    //   const { min, max } = parsePriceRange(price);
    
    //   const filtered = properties.filter(property => {
    //     const propertyPrice = parseInt(property.price, 10); // Ensure property price is a number
    //     return property.locality.includes(locality) && propertyPrice >= min && propertyPrice <= max;
    //   });
    
    //   setFilteredProperties(filtered);
    // };
    
    
    let changeHandler =(e) => {
        console.log(e);
        let countyName = e.target.value;
        //navigate to search results component
        navigate('/searchresults/'+ countyName,{state:{allhouses:houseData}});
    }


  return (
    <>
    <div className="row d-flex justify-content-center">
        <div className="col-sm-12 text-center">
            <h3> Search</h3>
        </div>
    </div>
    <div className="row justify-content-center">
        <div className="col-3">             
      
        <label htmlFor="locality">Locality:</label>
        <input
          list="localityOptions"
          id="locality"
          value={locality}
          onChange={(e) => setLocality(e.target.value)}
        />
        <datalist id="localityOptions">      
          {
          uniqueCounties.map((countyName) =>{
              return <option key={countyName} value={countyName}> {countyName}</option>
          })
          }
        </datalist>
      </div>
{/* 
      <div>
        <label htmlFor="price">Price:</label>
        <input
          list="priceOptions"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <datalist id="priceOptions">
          <option key="<1000" value="<1000"> Under $1000 </option>
          <option key="1000-2000" value=">1000and<2000"> $1000 - $2000 </option>
          <option key="1000-2000" value=">2000and<3000"> $2000 - $3000 </option> 
          <option value=">3000"> Over $3000 </option>
          {
          uniqueCounties.map((countyName) =>{
              return <option key={countyName} value={countyName}> {countyName}</option>
            })
          }
        </datalist>
      </div>
       */}
      
      <div className="col-3">  
        <label htmlFor="bhk">BHK:</label>
        <input
          list="bhkOptions"
          id="bhk"
          value={bhk}
          onChange={(e) => setBHK(e.target.value)}
        />
        <datalist id="bhkOptions">
          {/* Replace these options with your actual localities */}          
          {
          uniqueBHK.map((bhk) =>{
              return <option key={bhk} value={bhk}> {bhk}</option>
          })
          }
        </datalist>
      </div>
      <div className="col-1">   
      <button onClick={handleSubmit} type="submit">Search</button>
      </div>
    {/* </form> */}
</div>


  
  </>
     
  );
}

export default SearchFilter;