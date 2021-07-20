import React from "react";
import { useState } from "react";
import Nav from "../../components/nav";
import {
  Typography,
  Grid,
  TextField,
  Button,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import Script from "next/script";
import { useRouter } from "next/router";
import validator from "validator";

export default function Add() {
  const GOOGLE_MAP_KEY = process.env.GOOGLE_MAP_KEY;
  const googleURL = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_KEY}&libraries=places`;
  const router = useRouter();

  const [fedDatetime, setFedDatetime] = useState("");
  const [address, setAddress] = useState("");
  const [geoCode, setGeoCode] = useState({});
  const [foodType, setFoodType] = useState("");
  const [duckNumbers, setDuckNumbers] = useState("");
  const [foodWeight, setFoodWeight] = useState("");

  const [errorFedDatetime, setErrorFedDatetime] = useState(false);
  const [errorAddress, setErrorAddress] = useState(false);
  const [errorGeoCode, setErrorGeoCode] = useState(false);
  const [errorFoodType, setErrorFoodType] = useState(false);
  const [errorDuckNumbers, setErrorDuckNumbers] = useState(false);
  const [errorFoodWeight, setErrorFoodWeight] = useState(false);

  const [alert, setAlert] = useState({});
  const [backDropLoading, setBackDropLoading] = useState(false);

  const handleSelect = async (address) => {
    setAddress(address);
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        // console.log("Success", latLng);
        setGeoCode(latLng);
      })
      .catch((error) => console.error("Error", error));
  };

  const submitFedForm = async (e) => {
    e.preventDefault();

    /** loading */
    setBackDropLoading(true);

    /** print value */
    // console.log(`fedDatetime: ${fedDatetime}`);
    // console.log(`address: ${address}`);
    // console.log(`geoCode: ${geoCode}`);
    // console.log(`foodType: ${foodType}`);
    // console.log(`duckNumbers: ${duckNumbers}`);
    // console.log(`foodWeight: ${foodWeight}`);

    /** validate */
    const fedDate = validator.toDate(fedDatetime);
    const errFedDatetime = fedDate === null || validator.isAfter(fedDatetime) ? true : false;
    setErrorFedDatetime(errFedDatetime);

    const errAddress = validator.isEmpty(address) === true ? true : false;
    setErrorAddress(errAddress);

    const errGeocode =
      geoCode && geoCode.hasOwnProperty("lat") && geoCode.hasOwnProperty("lng")
        ? false
        : true;
    setErrorGeoCode(errGeocode);

    const errDuckNumbers = duckNumbers <= 0 ? true : false;
    setErrorDuckNumbers(errDuckNumbers);

    const errFoodType = validator.isEmpty(foodType) === true ? true : false;
    setErrorFoodType(errFoodType);

    const errFoodWeight = foodWeight <= 0 ? true : false;
    setErrorFoodWeight(errFoodWeight);

    // console.log(`errorFedDatetime: ${errorFedDatetime}`);
    // console.log(`errorAddress: ${errorAddress}`);
    // console.log(`errorGeoCode: ${errorGeoCode}`);
    // console.log(`errorFoodType: ${errorFoodType}`);
    // console.log(`errorDuckNumbers: ${errorDuckNumbers}`);

    if (
      !errFedDatetime &&
      !errAddress &&
      !errGeocode &&
      !errDuckNumbers &&
      !errFoodType &&
      !errFoodWeight
    ) {
      /** pass validate, call API */
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          datetime: fedDatetime,
          location: {
            lat: geoCode.lat,
            lng: geoCode.lng,
            address: address,
          },
          duck_number: duckNumbers,
          food_type: foodType,
          food_weight: foodWeight,
        }),
      };

      fetch("/api/feed", requestOptions)
        .then((response) => {
          if (response.ok) {
            setAlert({ severity: "success", message: "Success submit data." });
            setBackDropLoading(false);

            router.push("/view"); /** redirect to /view after save data success */
          } else {
            setAlert({
              severity: "error",
              message: "Failed to submit. Please try again later.",
            });
            setBackDropLoading(false);
          }
        })
        .catch((error) => {
          console.error(`error: ${error}`);
          setAlert({ severity: "error", message: "Failed to submit." });
          setBackDropLoading(false);
        });
    } else {
      setAlert({
        severity: "warning",
        message: "please check your input value!",
      });
      setBackDropLoading(false);
    }
  };
  return (
    <>
      <Script src={googleURL} strategy="beforeInteractive" />
      <Nav alert={alert} />
      <Typography component="h1" variant="h5">
        Add your fed information
      </Typography>
      <form
        onSubmit={(e) => {
          submitFedForm(e);
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <TextField
              id="datetime-local"
              label="Fed Date"
              type="datetime-local"
              value={fedDatetime}
              onChange={(event) => setFedDatetime(event.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              error={errorFedDatetime}
              helperText={
                errorFedDatetime
                  ? "Please check your fed date time. Date should before current date."
                  : ""
              }
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <PlacesAutocomplete
              value={address}
              onChange={setAddress}
              onSelect={handleSelect}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
              }) => (
                <div>
                  <TextField
                    fullWidth
                    label="Fed Location"
                    InputLabelProps={{ shrink: true }}
                    {...getInputProps({
                      placeholder: "Search Places ...",
                      className: "location-search-input",
                    })}
                    error={errorAddress}
                    helperText={
                      errorAddress ? "Please input your fed location." : ""
                    }
                  />
                  <div className="autocomplete-dropdown-container">
                    {loading && <div>Loading...</div>}
                    {suggestions.map((suggestion) => {
                      const className = suggestion.active
                        ? "suggestion-item--active"
                        : "suggestion-item";
                      // inline style for demonstration purpose
                      const style = suggestion.active
                        ? { backgroundColor: "#fafafa", cursor: "pointer" }
                        : { backgroundColor: "#ffffff", cursor: "pointer" };
                      return (
                        <div
                          key={suggestion.placeId}
                          {...getSuggestionItemProps(suggestion, {
                            className,
                            style,
                          })}
                        >
                          <span>{suggestion.description}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              value={duckNumbers}
              type="number"
              onChange={(event) => setDuckNumbers(event.target.value)}
              label="Number of Ducks"
              placeholder="10"
              error={errorDuckNumbers}
              helperText={errorDuckNumbers ? "Please input number." : ""}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              value={foodType}
              onChange={(event) => setFoodType(event.target.value)}
              label="Food Type"
              placeholder="Cracked corn, Oats, Birdseed"
              error={errorFoodType}
              helperText={errorFoodType ? "Please input your fed food." : ""}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              value={foodWeight}
              type="number"
              onChange={(event) => setFoodWeight(event.target.value)}
              label="Food weight (Grams)"
              placeholder="100"
              error={errorFoodWeight}
              helperText={errorFoodWeight ? "Please input number." : ""}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Button variant="outlined" type="submit" color="primary">
            Submit Feeding
          </Button>
          <Backdrop open={backDropLoading}>
            <CircularProgress color="inherit" />
          </Backdrop>
        </Grid>
      </form>
    </>
  );
}
