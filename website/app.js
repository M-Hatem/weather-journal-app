// Global Variables

const baseURL = `http://api.openweathermap.org/data/2.5/forecast?zip=`
const apiKey = `&appid=643affcd5d295503c9712b85e03ccb19&units=metric`

const generate = document.getElementById('generate')

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate()+'.'+ (d.getMonth()+1)+'.'+ d.getFullYear();

// making an event listener for the button
generate.addEventListener('click', preformAction)

// Making a calBack function for the event that contains 3 functions (Promise method)
function preformAction() {
   const zip = document.getElementById('zip').value
   const feelings = document.getElementById('feelings').value
   // Making a condition to fill all the forms
   if (feelings === '') {
      alert('Please fill all forms')
   } else {
   getWeather(baseURL, zip, apiKey)
   // and now let's take the data that we got and send it to the server
      .then(function(data){
         postData('/addData', {date: newDate, temp: data.list[0].main.temp, content: feelings, country: data.city.country, town: data.city.name})
         // and update the HTML (Interface)
         updateUI()
   })
}
}
// First function that get the data from the API site by fetch Method
const getWeather = async (baseURL, zip, apiKey) => {
   try {
      // Getting all the data from the api website and transferring it to JSON type
      const res = await fetch(baseURL+zip+apiKey)
      const data = res.json();
      console.log(data)
      // Making a condition to type a valid zipcode that returns data from the API site
      if (res.status == 404) {
         // Adding a condition to Verfiy the zipcode enterd by the user
         const warning = document.getElementById('warning')
         warning.innerHTML = `Please Enter a Valid Zipcode`
      } else if (res.status == 400) {
         const warning = document.getElementById('warning')
         warning.innerHTML = `Please Enter a Zipcode`
      } else {
      return data;
      }
   // to Handle the error if there is
   } catch(error) {
      console.log('error', error)
   }
}

// Now storing the data in the server
const postData = async (url = '', data = {}) => {
   console.log(data)
   const response = await fetch(url,{
      // Sending the data by POST method
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header        
      body: JSON.stringify(data), 
    });

try {
   const newData = await response.json()
   return newData
   // to handle the error if there is any
} catch(error) {
   console.log('error', error)
   }
};

// not updating the UI to show the requiered data
const updateUI = async () => {
   const request = await fetch('/all');
   try{
      const allData = await request.json();
      document.getElementById('date').innerHTML = `Date: ${allData.date}`
      document.getElementById('temp').innerHTML = `Temperature: ${allData.temp} C°`
      document.getElementById('content').innerHTML = `I'm Feeling: ${allData.content}`
      document.getElementById('country').innerHTML = `Country: ${allData.country} "${allData.town}"`
      // to handle the error if there is any
   } catch (error) {
      console.log('error', error)
   }
}