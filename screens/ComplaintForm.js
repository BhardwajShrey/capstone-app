import React, {useState, useEffect} from "react";
import {StyleSheet, View, Text, TextInput, TouchableWithoutFeedback, Keyboard, Alert, ScrollView, SafeAreaView} from "react-native";
import {Formik} from "formik";
import * as yup from "yup";
import firebase from "firebase";
import * as Location from 'expo-location';
import CheckBox from "react-native-check-box";
import AnimatedLoader from "react-native-animated-loader";

import {globalStyles} from "../styles/Global";
import FlatButton from "../shared/FlatButton";
import MiscButton from "../shared/MiscButton";

require("firebase/firestore");
require("firebase/firebase-storage");

const complaintSchema = yup.object(
    {
        Title: yup.string().required(),
        Complaint: yup.string().required(),
        Location: yup.string().required()
    }
);
// test function arguments = (name given to test, error message to be displayed, function to validate against)

export default function ComplaintForm({navigation, route})
{
    const [images, setImages] = useState([]);
    const [currRoute, setCurrRoute] = useState(route);

    const [covidAreaCheckBox, setCovidAreaCheckBox] = useState(false);
    const [covidViolationCheckBox, setCovidViolationCheckBox] = useState(false);

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        (async () => {
          let { status } = await Location.requestPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }   
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
        })();
    }, []); 

    let position = 'Waiting...';

    var coordinates = [];

    if (errorMsg) {
        position = errorMsg;
    } else if (location) {
        let temp = JSON.stringify(location);
        position = JSON.parse(temp);
        coordinates = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        };
        // position.coords.latitude, position.coords.longitude;
    }


    const uploadData = (values, storageURL = null) =>
    {
        // console.log(values);
        // console.log(storageURL);

        var url = 'https://smart-citizen-app.herokuapp.com/api/predict-class?text_query="' + values.Complaint + '"';

        fetch(url)
        .then((response) => response.json())
        .then((json) => {
            var labels = json.labels.filter(
                label =>
                {
                    return label.confidence > 0.25;
                }
            );

            labels = labels.map(
                label =>
                {
                    return label.category;
                }
            );
            firebase.firestore().collection("posts").doc(firebase.auth().currentUser.uid).collection("userPosts").add(
                {
                    image: storageURL,
                    body: values.Complaint,
                    title: values.Title,
                    location: values.Location,
                    creation: firebase.firestore.FieldValue.serverTimestamp(),
                    comments: "",
                    status: "Processing",
                    type: labels,
                    isCovidArea: covidAreaCheckBox,
                    isCovidViolation: covidViolationCheckBox,
                    coordinates: coordinates
                }
            ).then(
                (
                    function()
                    {
                        setModalOpen(false);
                        console.log("Record created...");
                    }
                )
            );

            // console.log(json.labels[0].category);
            // console.log(labels);
        })
        .catch((error) => {
            setModalOpen(false);
            console.error(error);
        });
    }

    const uploadToStorage = async (values) =>
    {
        if(images.length !== 0)
        {
            const res = await fetch(images[0]);
            const blob = await res.blob()
            const task = firebase.storage().ref().child(`post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`).put(blob)
            const taskProgress = snapshot =>
            {
                console.log(`transferred: ${snapshot.bytesTransferred}`);
            }
        
            const taskCompleted = () =>
            {
                task.snapshot.ref.getDownloadURL().then(
                    (snapshot) =>
                    {
                        // console.log(snapshot);
                        uploadData(values, snapshot);
                    }
                )
            }
        
            const taskError = snapshot =>
            {
                console.log(snapshot);
            }
        
            task.on("state_changed", taskProgress, taskError, taskCompleted);
        }
        else
        {
            uploadData(values);
        }
    }

    useEffect(
        () =>
        {
            // console.log(images);
            if(route !== currRoute && route.params?.image)
            {
                setImages(
                    (currentImages) =>
                    {
                        return [...currentImages, route.params.image]
                    }
                );

                setCurrRoute(route);
            }
            
        }, [route]
    );

    var addImageButton = null;
    var imagesAttached = null;

    if(images.length !== 0)
    {
        addImageButton = (
            <MiscButton text = "Add an image" onPress = {() => Alert.alert("Image already added", "Cannot add more than one image", [{text: "Okay"}])} />
        );
        imagesAttached = (
            <Text style = {globalStyles.errorText}>One image attached.</Text>
        );
    }
    else
    {
        addImageButton = (
            <MiscButton text = "Add an image" onPress = {() => navigation.navigate("AddImage")} />
        );
        imagesAttached = null;
    }
    

    return(
        <SafeAreaView>
                <AnimatedLoader
                    visible = {modalOpen}
                    overlayColor="rgba(255,255,255,0.75)"
                    source={require("../assets/loader.json")}
                    animationStyle={styles.lottie}
                    speed={1}
                    loop = {true}
                >
                    <Text>Sending complaint to our servers...</Text>
                </AnimatedLoader>
            <ScrollView>
                <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
                    <View style = {globalStyles.container}>
                            <Formik
                                initialValues = {{Title: "", Complaint: "", Location: ""}}
                                validationSchema = {complaintSchema}
                                onSubmit = {
                                    (values, actions) =>
                                    {
                                        setModalOpen(true);
                                        actions.resetForm();
                                        // console.log(images);
                                        uploadToStorage(values);
                                        setImages([]);
                                    }
                                }
                            >
                                {
                                    (props) =>
                                    (
                                        <View>
                                            <TextInput
                                                style = {globalStyles.input}
                                                placeholder = "Title of your complaint"
                                                onChangeText = {props.handleChange("Title")}
                                                value = {props.values.Title}
                                                onBlur = {props.handleBlur("Title")}
                                            />
                                            <Text style = {globalStyles.errorText}>{props.touched.Title && props.errors.Title}</Text>

                                            <TextInput
                                                multiline
                                                minHeight = {120}
                                                style = {globalStyles.input}
                                                placeholder = "Complaint in detail..."
                                                onChangeText = {props.handleChange("Complaint")}
                                                value = {props.values.Complaint}
                                                onBlur = {props.handleBlur("Complaint")}
                                            />
                                            <Text style = {globalStyles.errorText}>{props.touched.Complaint && props.errors.Complaint}</Text>

                                            <TextInput
                                                style = {globalStyles.input}
                                                placeholder = "Location"
                                                onChangeText = {props.handleChange("Location")}
                                                value = {props.values.Location}
                                                onBlur = {props.handleBlur("Location")}
                                            />
                                            <Text style = {globalStyles.errorText}>{props.touched.Location && props.errors.Location}</Text>

                                            {/* <Button
                                                title = "Add images (optional)"
                                                color = "maroon"
                                                onPress = {() => navigation.navigate("AddImage")}
                                            /> */}
                                            {addImageButton}
                                            {imagesAttached}

                                            <CheckBox
                                                style={{flex: 1, padding: 20, marginHorizontal: 45}}
                                                onClick={() => {setCovidAreaCheckBox(!covidAreaCheckBox)} }
                                                isChecked={covidAreaCheckBox}
                                                rightText={"This incident is in a covid affected area"}
                                            />

                                            <CheckBox
                                                style={{flex: 1, padding: 20, marginHorizontal: 45}}
                                                onClick={() => {setCovidViolationCheckBox(!covidViolationCheckBox)} }
                                                isChecked={covidViolationCheckBox}
                                                rightText={"This incident is related to Covid rules violations"}
                                            />

                                            <MiscButton text = "Add a Location" onPress = {() => navigation.navigate("AddLocation", {coordinates})} />
                                            <FlatButton text = "Submit" onPress = {props.handleSubmit} />
                                        </View>
                                    )
                                }
                            </Formik>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    lottie: {
        width: 200,
        height: 200
    }
  });