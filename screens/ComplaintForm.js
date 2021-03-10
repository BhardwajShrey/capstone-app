import React from "react";
import { View, Text, TextInput} from "react-native";
import {Formik} from "formik";
import * as yup from "yup";

import {globalStyles} from "../styles/Global";
import FlatButton from "../shared/FlatButton";

const complaintSchema = yup.object(
    {
        Title: yup.string().required(),
        Complaint: yup.string().required(),
        Location: yup.string().required()
    }
);
// test function arguments = (name given to test, error message to be displayed, function to validate against)

export default function ReviewForm({addComplaint})
{
    return(
        <View style = {globalStyles.container}>
            <Formik
                initialValues = {{Title: "", Complaint: "", Location: ""}}
                validationSchema = {complaintSchema}
                onSubmit = {
                    (values, actions) =>
                    {
                        actions.resetForm();
                        addComplaint(values);
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
                                title = "Submit"
                                color = "maroon"
                                onPress = {props.handleSubmit}
                            /> */}
                            <FlatButton text = "Submit" onPress = {props.handleSubmit} />
                        </View>
                    )
                }
            </Formik>
        </View>
    );
}