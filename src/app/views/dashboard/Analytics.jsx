
import React, { useEffect } from "react";
// import { Chart } from "react-google-charts";
// import { getDataSourseVise, getProductData } from "../../api/revenue";
import  DaynamicGraph  from '../dashboard/DaynamicGraph'
import '../dashboard/dashboard.css'

function Analytics() {

useEffect(() => {
  // fetchData();
  // fetchProductData();
}, []);



// const [data, setData] =  useState();
// const [productData, setProductData] =  useState();

// const [productStatement, setProductStatement] =  useState();
// const [sourseStatement, setSourseStatement] =  useState();


// const fetchData = async () => {
//   const res = await getDataSourseVise();
//   let a =  res.data.data;
//   setSourseStatement(res.data.statement)

//   let tmpArr = [];

//   for (let i of a) {
//     tmpArr.push([i.source, i.transactionrevenue]);
//   }

//   const data = [
//     ["Task", "Top Source Of Revenue"],
//     ...tmpArr
//   ];
//   setData(data);
// }

// const fetchProductData = async () => {
//   const res = await getProductData();

//   setProductStatement(res.data.statement)
//   let a =  res.data.data;


//   console.log(a)
//   let tmpArr = [];

//   for (let i of a) {
//     tmpArr.push([i.productname, i.itemrevenue]);
//   }

//   const data = [
//     ["Task", "Top Source Of Revenue"],
//     ...tmpArr
//   ];
//   setProductData(data);
// }

// const options = {
//   title: "Top Product Name",
//   is3D: true,
// };

// const optionSourse = {
//   title: "Top Source Of Revenue",
//   pieHole: 0.4,
//   is3D: false,
// };

  return (
    <div className="text-center">
    <DaynamicGraph />
   </div>
  );
}

export default Analytics;
