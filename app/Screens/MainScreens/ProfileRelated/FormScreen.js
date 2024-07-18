import { Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, Button, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, Alert } from 'react-native';
import AuthComponent from '../../AuthScreens/AuthComponent.js';
// import CustomButton from '../../Components/UI/Button/ButtonC1';
import CustomButton from '../../../Components/UI/Button/ButtonC1.js';
import CustomTextInput from '../../../Components/UI/Inputs/CustomTextInput.js';

import {
  Entypo,
  Feather,
  AntDesign,
  MaterialIcons,
  Ionicons, FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import { useEffect, useState } from 'react';
import { useFormik } from "formik";

import { FormDataApi, GetCourseData, GetFormDataSumbited, GetFormReqs, UserLoginApi } from "../../../utils/API_Calls.js";
import Spinner from 'react-native-loading-spinner-overlay';

import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import MainComponent from '../MainComponent.js';

import { FormData } from '../../../Fomik/schema/FormData.js';
import CustomDateInput from '../../../Components/UI/Inputs/CustomDateInput.js';
import CustomPicker from '../../../Components/UI/Inputs/CustomPicker.js';
import { DateConvert } from '../../../utils/DateConvert.js';


export default function FormScreen() {
  const [date123, setDate] = useState(new Date());

  const [errorFormAPI, seterrorFormAPI] = useState("")
  const [spinnerBool, setSpinnerbool] = useState(false)
  const [userReviewsData, setUserReviewsData] = useState()


  const ErrorChecker = () => {
    if (Object.values(errors).length === 0) {
      handleSubmit();
    } else {
      // Display errors in an alert
      // alert(Object.values(errors).join(', '));
      alert("Please fill in the mandatory fields");
    }
  };


  const { handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    values,
    touched,
    errors,
    isValid,
    setValues,
    resetForm,
  } = useFormik({
    initialValues: {
      category: "", courseName: "",
      // firstName: "Rohith", lastName: "Madipelly", gender: "", age: "20", education: "Civil Btech", martialStatus: "", guardianName: "Venu", language: "", mobileNumber: "9951072003", eMail: "madipellyrohith@gmail.com", address: "11-24-140,2nd bank Colony,", medicineName: "", medicineDose: "", regularMedicine: "", brief: "", referenceFrom: "",
      firstName: "", lastName: "", gender: "", age: "", education: "", martialStatus: "", guardianName: "", language: "", mobileNumber: "", eMail: "", address: "", medicineName: "", medicineDose: "", regularMedicine: "", brief: "", referenceFrom: "",
      oldStuName: "", firstCoursePlace: "", dateFirstCourse: "", dateLastCourse: "", firstAsstTeacher: "", lastCoursePlace: "", lastAsstTeacher: "", courseDetails: "", triedAnyPractise: "", practiseRegularly: "", dailyHours: "", reason: "", changeInYourSelf: "",
      personName: "", personRelation: "", courseDone: "", relation: "", designation: "", companyName: "", companyAddress: "", inPastOne: "", inPresentOne: "", FitnessCertificate: "", inPastTwo: "", inPresentTwo: ""
    },

    onSubmit: values => {
      { submitHandler(values) }
    },

    validationSchema: FormData,

    validate: values => {
      const errors = {};
      return errors;
    },

  });

  const [stratingfrom, setstartingFrom] = useState("")

  const [courseDate, setCourseDate] = useState("")

  const minvalueofstratingfrom = DateConvert(stratingfrom)
  const minvalueofcourseDate = DateConvert(courseDate)

  let tokenn = useSelector((state) => state.token);
  const navigation = useNavigation();



  const [courseData, setCourseData] = useState("")
  const [from, setfrom] = useState()
  const [to, setCourseDataTo] = useState()


  const [toDisplay, setToDisplay] = useState(false)
  const [data, SetData] = useState([])
  const [otherLanguage, setOtherLanguage] = useState('');
  const [otherState, setOtherState] = useState('');

  // Function to handle change in other language input
  const handleOtherLanguageChange = (text) => {
    setOtherLanguage(text);
  };


  // Function to handle change in other language input
  const handleOtherStateChange = (text) => {
    setOtherState(text);
  };


  try {
    if (tokenn != null) {
      tokenn = tokenn.replaceAll('"', '');
    }
  }
  catch (err) {
    console.log("Error in token quotes", err)
  }


  const categoryData = [
    { label: 'Select Category', value: 'N/A' },
    { label: 'For New Students', value: 'For New Students' },
    { label: 'For Old Students', value: 'For Old Students' },
    { label: 'For Children/Teens', value: 'For Children/Teens' },
    { label: 'For Executives', value: 'For Executives' },
  ];


  const genders = [
    { label: 'Select gender', value: 'N/A' },
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
  ];

  const Types = [
    { label: 'Select Type', value: 'N/A' },
    { label: 'Attend', value: 'Attend' },
    { label: 'Serve', value: 'Serve' },
  ];

  const AllcoursesforDrops = [
    { label: 'Select Type', value: '' },
    ...data.map(course => ({
      label: course.courseName,
      value: course._id
    }))
  ];



  const martialStatus = [
    { label: 'Select', value: 'N/A' },
    { label: 'Single', value: 'Single' },
    { label: 'Married', value: 'Married' },
    { label: 'Widower', value: 'Widower' },
    { label: 'Widow', value: 'Widow' },
    { label: 'Separated', value: 'Separated' },
    { label: 'Divorced', value: 'Divorced' },
  ];

  const courseDetailsData = [
    // "10-Days", "20-Days", "30-Days", "50-Days", "60-Days", "Self-Course", "Service", "Courses", "N/A"
    { label: 'Select course details', value: '' },
    { label: '10-Days', value: '10-Days' },
    { label: '20-Days', value: '20-Days' },
    { label: '30-Days', value: '30-Days' },
    { label: '40-Days', value: '40-Days' },
    { label: '50-Days', value: '50-Days' },
    { label: '60-Days', value: '60-Days' },
    { label: 'Self-Course', value: 'Self-Course' },
    { label: 'Service', value: 'Service' },
    { label: 'Courses', value: 'Courses' },
  ];


  const practiseRegularlyData = [
    // "10-Days", "20-Days", "30-Days", "50-Days", "60-Days", "Self-Course", "Service", "Courses", "N/A"
    { label: 'Select course details', value: '' },

    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' },
    { label: 'Courses', value: 'Courses' },
  ];

  const regularMedicineData = [
    { label: 'Select', value: 'N/A' },
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' },
  ];

  const FitnessCertificateData = [
    { label: 'Select', value: 'N/A' },
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' },
  ];
  const inPastTwoData = [
    { label: 'Select', value: 'N/A' },
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' },
  ];

  const inPresentTwoData = [
    { label: 'Select', value: 'N/A' },
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' },
  ];


  const referenceFromData = [
    { label: 'Select', value: 'N/A' },
    { label: 'Friend', value: 'Friend' },
    { label: 'News-Paper', value: 'News-Paper' },
    { label: 'TV', value: 'TV' },
    { label: 'Lectures', value: 'Lectures' },
    { label: 'Others', value: 'Others' },
  ];


  const languageData = [
    { label: 'Select', value: 'N/A' },
    { label: 'Hindi', value: 'hindi' },
    { label: 'English', value: 'english' },
    // { label: 'Kolkata', value: 'Kolkata' },
    // { label: 'Bikaner', value: 'Bikaner' },
    // { label: 'Other', value: 'other' },
  ]

  const stateData = [
    { label: 'Select', value: 'N/A' },
    { label: 'Kolkata', value: 'Kolkata' },
    { label: 'Bikaner', value: 'Bikaner' },
    { label: 'Other', value: 'other' },
  ]

  const courseDoneList = [
    { label: 'Select', value: 'N/A' },
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' },
  ];
  // Get the All Courses Avaliable for user
  const GetData = async () => {
    const res = await GetFormReqs(tokenn)
    try {
      if (res) {
        let hero = res.data.allCourses;
        console.log("hero Data", hero)
        SetData(hero)
      }
    }
    catch (error) {
      console.log(error)
    }
  }




  // When user Selects Course Fetch the Course Information
  const fetchUserData = async (id) => {
    if (id === 'N/A') {
      return
    }
    try {
      const response = await GetCourseData(id, tokenn);
      console.log(">>>>>>", response.data);
      setToDisplay(true)
      setCourseData(response.data)
      setfrom(response.data.from)
      setCourseDataTo(response.data.to)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Previews Data of user 
  const GetFormData = async () => {
    const res = await GetFormDataSumbited(tokenn)
    try {
      if (res) {
        setUserReviewsData(res.data.userExists)
      }
      else {
      }
    }
    catch (error) {
      setSpinnerbool(false)
    }
    finally {
      setSpinnerbool(false)
    }
  }

  useEffect(() => {
    GetFormData()
    GetData()
  }, [])




  // Shows Alert and Navigates to given page
  const showAlertAndNavigate = (responseData, toNavigate) => {
    Alert.alert(
      'Success',
      responseData,
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate(toNavigate),
        },
      ],
      { cancelable: false }
    );
  };


  date = date123.toLocaleDateString()


  const submitHandler = async (user) => {
    console.log("Clear from fomik", user)
    seterrorFormAPI()
    try {
      console.log("Data Set")
      const { category, state, firstName, lastName, gender, age, education, martialStatus, guardianName, language, mobileNumber, eMail, address, medicineName, medicineDose, regularMedicine, brief, referenceFrom,
        oldStuName, firstCoursePlace, dateFirstCourse, dateLastCourse, firstAsstTeacher, lastCoursePlace, lastAsstTeacher, courseDetails, triedAnyPractise, practiseRegularly, dailyHours, reason, changeInYourSelf,
        personName, personRelation, courseDone, FitnessCertificate, relation, designation, companyName, companyAddress, inPastOne, inPresentOne, inPastTwo, inPresentTwo } = user;

      const oldStudent = {
        oldStuName,
        dateFirstCourse,
        firstCoursePlace,
        firstAsstTeacher,
        dateLastCourse,
        lastCoursePlace,
        lastAsstTeacher,
        courseDetails,
        triedAnyPractise,
        practiseRegularly,
        dailyHours,
        reason,
        changeInYourSelf,
      }



      // console.log("dsjbjfjka", oldStudent)
      const knownPerson = {
        personName,
        personRelation
      }
      const familyPerson = {
        courseDone,
        relation: `${courseDone === 'yes' ? relation : ""}`
      }
      const professionalDetails = {
        designation,
        companyName,
        companyAddress
      }
      const physicalAilment = {
        inPastOne,
        inPresentOne
      }
      const psyschologicalAilment = {
        inPastTwo,
        inPresentTwo
      }

      const docFitnessCertificate = {

        medicineName: `${FitnessCertificate === 'Yes' ? medicineName : "N/A"}`,
        medicineDose: `${FitnessCertificate === 'Yes' ? medicineDose : "N/A"}`,
      }
      const courseId = `${courseData._id}`
      const courseName = `${courseData.courseName}`
      const courseDuration = `${courseData.courseDuration}`




      const dataEngin = { category, courseId, courseName, courseDuration, from, to, date, firstName, lastName, gender, age, education, martialStatus, guardianName, language: `${otherLanguage ? otherLanguage : language}`, state: `${otherState ? otherState : state}`, mobileNumber, eMail, address, regularMedicine, brief, referenceFrom, oldStudent, docFitnessCertificate, psyschologicalAilment, physicalAilment, professionalDetails, familyPerson, knownPerson }
      setSpinnerbool(true)
      console.log(">>>>Tester", dataEngin.language)
      console.log(">>>>Tester", dataEngin.state)
      console.log(">>>>Tester regularMedicine", regularMedicine)
      console.log(">>>>Tester", dataEngin)
      console.log("asdda")
      const res = await FormDataApi(dataEngin, tokenn)

      if (res) {
        const Message = res.data.message
        showAlertAndNavigate(Message, "Home")
        setTimeout(() => {

          setSpinnerbool(false)
        }, 50);
      }

    } catch (error) {
      console.log("fs<><><<><><<>", error.response.data.message)
      if (error.response) {
        if (error.response.status === 400) {
          console.log("Error With 400.")
          showAlertAndNavigate(error.response.data.message, "Home")
        }
        else if (error.response.status === 401) {
          seterrorFormAPI({ PasswordForm: `${error.response.data.message}` })
        }
        else if (error.response.status === 404) {
          seterrorFormAPI({ eMailForm: `${error.response.data.message}` })
        }

        else if (error.response.status === 500) {
          console.log("Internal Server Error", error.message)
        }
        else {
          console.log("An error occurred response.", error.response.status)
        }
      }
      else if (error.request) {
        console.log("No Response Received From the Server.")
      }
      else {
        console.log("Error in Setting up the Request.")
      }

      //   ToasterSender("Error in Setting up the Request.")
      //   ToasterSender({ Message: error.response.data.message })
      // ToasterSender({ Message: error })

      setSpinnerbool(false)

      if (error) {
        console.log(error)
        // message = error.message;
        // seterrorFormAPI(message)
        // "eMail or Password does not match !"
      }
    }
    finally {
      setSpinnerbool(false)
    }
  }


  useEffect(() => {
    if (userReviewsData) {
      const timer = setTimeout(() => {
        setValues({
          values,
          firstName: `${userReviewsData.firstName}`,
          lastName: `${userReviewsData.lastName}`,
          eMail: `${userReviewsData.eMail}`,
          mobileNumber: `${userReviewsData.mobileNumber}`,
          education: `${userReviewsData.education}`,
          address: `${userReviewsData.address}`,

          gender: `${userReviewsData.gender}`,
          city: `${userReviewsData.city}`,
          guardianName: `${userReviewsData.guardianName}`,
          age: `${userReviewsData.age}`,
          martialStatus: `${userReviewsData.martialStatus}`,
          language: `${userReviewsData.language}`,
          referenceFrom: `${userReviewsData.referenceFrom}`,
          brief: `${userReviewsData.brief}`,



          oldStuName: `${userReviewsData.oldStudent.oldStuName}`,
          dateFirstCourse: `${userReviewsData.oldStudent.dateFirstCourse}`,
          firstCoursePlace: `${userReviewsData.oldStudent.firstCoursePlace}`,
          firstAsstTeacher: `${userReviewsData.oldStudent.firstAsstTeacher}`,
          dateLastCourse: `${userReviewsData.oldStudent.dateLastCourse}`,
          lastCoursePlace: `${userReviewsData.oldStudent.lastCoursePlace}`,
          lastAsstTeacher: `${userReviewsData.oldStudent.lastAsstTeacher}`,

          courseDetails: `${userReviewsData.oldStudent.courseDetails}`,
          triedAnyPractise: `${userReviewsData.oldStudent.triedAnyPractise}`,
          practiseRegularly: `${userReviewsData.oldStudent.practiseRegularly}`,

          dailyHours: `${userReviewsData.oldStudent.dailyHours}`,
          reason: `${userReviewsData.oldStudent.reason}`,
          changeInYourSelf: `${userReviewsData.oldStudent.changeInYourSelf}`,

          personName: `${userReviewsData.knownPerson.personName}`,
          personRelation: `${userReviewsData.knownPerson.personRelation}`,


          courseDone: `${userReviewsData.familyPerson.courseDone}`,
          relation: `${userReviewsData.familyPerson.relation}`,



          designation: `${userReviewsData.professionalDetails.designation}`,
          companyName: `${userReviewsData.professionalDetails.companyName}`,
          companyAddress: `${userReviewsData.professionalDetails.companyAddress}`,


          // inPastOne: `${userReviewsData.physicalAilment.inPastOne}`,
          // inPresentOne: `${userReviewsData.physicalAilment.inPresentOne}`,

          // inPastTwo: `${userReviewsData.psyschologicalAilment.inPastTwo}`,
          // inPresentTwo: `${userReviewsData.psyschologicalAilment.inPresentTwo}`,


          // medicineName: `${userReviewsData.docFitnessCertificate.medicineName}`,
          // medicineDose: `${userReviewsData.docFitnessCertificate.medicineDose}`,
          // regularMedicine: `${userReviewsData.docFitnessCertificate.regularMedicine}`,




        });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [userReviewsData]);


  if (spinnerBool) {
    return (
      <Spinner
        visible={spinnerBool}
        color={"#5F2404"}
        animation={'fade'}
      />
    )
  }

  return (
    <>
      <MainComponent NameUnderLogo={"Satya Sadhna"} titleUnder={""} screenName={"Form"}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        // behavior={Platform.OS === "ios" ? 100:0}
        // keyboardVerticalOffset={1000}
        // style={styles.container}
        >
          {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
          <ScrollView style={{ height: 800 }}>
            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 50 }}>
              <>
                {/* {userReviewsData ? <Text>Preview Data fetched here</Text> : ""} */}
                {/* <Button title='Clear' onPress={()=>{resetForm}}></Button> */}

                <CustomPicker
                  placeholder={'Enter your category'}
                  asterisksymbol={true}
                  boxWidth={'80%'}
                  label={'Category'}
                  name='category'
                  onChangeText={(e) => { handleChange("category")(e); seterrorFormAPI(); }}
                  onBlur={handleBlur("category")}
                  validate={handleBlur("category")}
                  outlined
                  borderColor={`${(errors.category && touched.category) || (errorFormAPI && errorFormAPI.categoryForm) ? "red" : "#ccc"}`}
                  errorMessage={`${(errors.category && touched.category) ? `${errors.category}` : (errorFormAPI && errorFormAPI.categoryForm) ? `${errorFormAPI.categoryForm}` : ``}`}
                  value={values.category}
                  items={categoryData}
                  onValueChange={(itemValue) => handleChange("category")(itemValue)}
                  containerStyle={{ width: 200 }}
                  labelStyle={{ color: 'blue' }}
                  error="Please select a category"
                />

                {values.category === "For old students" && (
                  <CustomPicker
                    placeholder={'Select type'}
                    asterisksymbol={true}
                    boxWidth={'80%'}
                    label={'Type'}
                    name='Type'
                    // value={values.Type}
                    // leftIcon={<FontAwesome name="user" size={20} color="black" />}
                    // bgColor='#e1f3f8'
                    // bgColor="#B1B1B0"
                    onChangeText={(e) => { handleChange("Type")(e); seterrorFormAPI(); }}
                    onBlur={handleBlur("Type")}
                    validate={handleBlur("Type")}
                    outlined
                    borderColor={`${(errors.Type && touched.Type) || (errorFormAPI && errorFormAPI.TypeForm) ? "red" : "#ccc"}`}
                    errorMessage={`${(errors.Type && touched.Type) ? `${errors.Type}` : (errorFormAPI && errorFormAPI.TypeForm) ? `${errorFormAPI.TypeForm}` : ``}`}
                    value={values.Type}
                    items={Types}
                    onValueChange={(itemValue) => {
                      handleChange("Type")(itemValue);
                      // Make API call here passing the selected item's ID value
                    }}

                    containerStyle={{ width: 200 }}
                    labelStyle={{ color: 'blue' }}
                    error="Please select a Type"
                  />
                )}



                <CustomPicker
                  placeholder={'Enter your course '}
                  asterisksymbol={true}
                  boxWidth={'80%'}
                  label={'Select course'}
                  name='Courses'
                  onChangeText={(e) => { handleChange("Courses")(e); seterrorFormAPI(); }}
                  onBlur={handleBlur("Courses")}
                  validate={handleBlur("Courses")}
                  outlined
                  // borderColor={`${(errors.Courses && touched.Courses) || (errorFormAPI && errorFormAPI.CoursesForm) ? "red" : "#ccc"}`}
                  borderColor={`${(errors.Courses) ? "red" : "#ccc"}`}
                  errorMessage={`${(errors.Courses) ? `${errors.Courses}` : (errorFormAPI && errorFormAPI.CoursesForm) ? `${errorFormAPI.CoursesForm}` : ``}`}

                  value={values.Courses}
                  items={AllcoursesforDrops}
                  onValueChange={
                    (itemValue) => {
                      handleChange("Courses")(itemValue);
                      fetchUserData(itemValue)
                    }
                  }
                  containerStyle={{ width: 200 }}
                  labelStyle={{ color: 'blue' }}
                  error="Please select a courses"
                />



                {toDisplay ? <>
                  <View style={{ justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center', width: '90%' }}>
                    <CustomTextInput
                      placeholder={'From'}
                      boxWidth={'43%'}
                      label={'From'}
                      name='From'
                      value={from}
                      // asterisksymbol={true}
                      leftIcon={<MaterialIcons name="date-range" size={20} color="black" />}
                      // borderColor={`${(errors.from && touched.from) || (errorFormAPI && errorFormAPI.fromForm) ? "red" : "#ccc"}`}
                      // errorMessage={`${(errors.from && touched.from) ? `${errors.from}` : (errorFormAPI && errorFormAPI.courseNameForm) ? `${errorFormAPI.courseNameForm}` : ``}`}
                      editable={false}
                    />
                    {/* courseDataForm api save to handleChange("to")(from) */}


                    <CustomTextInput
                      placeholder={'To'}
                      boxWidth={'43%'}
                      label={'To'}
                      name='To'
                      value={to}
                      // asterisksymbol={true}
                      leftIcon={<MaterialIcons name="date-range" size={20} color="black" />}
                      // borderColor={`${(errors.courseName && touched.courseName) || (errorFormAPI && errorFormAPI.courseNameForm) ? "red" : "#ccc"}`}
                      // errorMessage={`${(errors.courseName && touched.courseName) ? `${errors.courseName}` : (errorFormAPI && errorFormAPI.courseNameForm) ? `${errorFormAPI.courseNameForm}` : ``}`}
                      editable={false}
                    />
                  </View>

                  <CustomTextInput
                    placeholder={'Your Course name'}
                    asterisksymbol={true}
                    boxWidth={'80%'}
                    label={'Course name'}
                    name='courseName'
                    value={`${courseData.courseName || values.courseName}`}
                    // leftIcon={<FontAwesome name="user" size={20} color="black" />}
                    // bgColor='#e1f3f8'
                    // bgColor="#B1B1B0"

                    onChangeText={(e) => { handleChange("courseName")(e); seterrorFormAPI(); }}
                    onBlur={handleBlur("courseName")}

                    validate={handleBlur("courseName")}
                    outlined
                    borderColor={`${(errors.courseName && touched.courseName) || (errorFormAPI && errorFormAPI.courseNameForm) ? "red" : "#ccc"}`}
                    errorMessage={`${(errors.courseName && touched.courseName) ? `${errors.courseName}` : (errorFormAPI && errorFormAPI.courseNameForm) ? `${errorFormAPI.courseNameForm}` : ``}`}
                    // errorColor='magenta'
                    editable={false}
                  />

                  <CustomTextInput
                    placeholder={'Your Course City'}
                    asterisksymbol={true}
                    boxWidth={'80%'}
                    label={'Course City'}
                    name='courseName'
                    value={`${courseData.city || values.courseName}`}
                    // leftIcon={<FontAwesome name="user" size={20} color="black" />}
                    // bgColor='#e1f3f8'
                    // bgColor="#B1B1B0"


                    outlined
                    borderColor={`${(errors.courseName && touched.courseName) || (errorFormAPI && errorFormAPI.courseNameForm) ? "red" : "#ccc"}`}

                    editable={false}
                  />

                  <CustomTextInput
                    placeholder={'Enter your course duration'}
                    asterisksymbol={true}
                    boxWidth={'80%'}
                    label={'Course duration'}
                    name='course_Duration'
                    value={`${courseData.courseDuration || values.course_Duration}`}
                    onChangeText={(e) => { handleChange("course_Duration")(e); seterrorFormAPI(); }}
                    onBlur={handleBlur("course_Duration")}
                    validate={handleBlur("course_Duration")}
                    outlined
                    borderColor={`${(errors.course_Duration && touched.course_Duration) || (errorFormAPI && errorFormAPI.course_DurationForm) ? "red" : "#ccc"}`}
                    errorMessage={`${(errors.course_Duration && touched.course_Duration) ? `${errors.course_Duration}` : (errorFormAPI && errorFormAPI.course_DurationForm) ? `${errorFormAPI.course_DurationForm}` : ``}`}
                    // errorColor='magenta'
                    editable={false}
                  />

                </> : ""}





                <CustomTextInput
                  boxWidth={'80%'}
                  asterisksymbol={true}
                  placeholder={'Enter your first name'}
                  label={'First name '}
                  name='First name'
                  value={values.firstName}
                  // leftIcon={<FontAwesome name="user" size={20} color="black" />}
                  // bgColor='#e1f3f8'
                  // bgColor="#B1B1B0"
                  onChangeText={(e) => { handleChange("firstName")(e); seterrorFormAPI(); }}
                  onBlur={handleBlur("firstName")}

                  validate={handleBlur("firstName")}
                  outlined
                  borderColor={`${(errors.firstName && touched.firstName) || (errorFormAPI && errorFormAPI.firstNameForm) ? "red" : "#ccc"}`}
                  errorMessage={`${(errors.firstName && touched.firstName) ? `${errors.firstName}` : (errorFormAPI && errorFormAPI.firstNameForm) ? `${errorFormAPI.firstNameForm}` : ``}`}
                // errorColor='magenta'
                />

                <CustomTextInput
                  boxWidth={'80%'}
                  asterisksymbol={true}
                  placeholder={'Enter your last name'}
                  label={'Last name'}
                  name='Last name'
                  value={values.lastName}
                  // leftIcon={<FontAwesome name="user" size={20} color="black" />}
                  // bgColor='#e1f3f8'
                  // bgColor="#B1B1B0"
                  onChangeText={(e) => { handleChange("lastName")(e); seterrorFormAPI(); }}
                  onBlur={handleBlur("lastName")}

                  validate={handleBlur("lastName")}
                  outlined
                  borderColor={`${(errors.lastName && touched.lastName) || (errorFormAPI && errorFormAPI.lastNameForm) ? "red" : "#ccc"}`}
                  errorMessage={`${(errors.lastName && touched.lastName) ? `${errors.lastName}` : (errorFormAPI && errorFormAPI.lastNameForm) ? `${errorFormAPI.firstNameForm}` : ``}`}
                // errorColor='magenta'
                />

                
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%' }}>

                  <CustomPicker
                    placeholder={'Enter your gender'}
                    asterisksymbol={true}
                    boxWidth={'60%'}
                    label={'Gender'}
                    name='gender'
                    // value={values.gender}
                    // leftIcon={<FontAwesome name="user" size={20} color="black" />}
                    // bgColor='#e1f3f8'
                    // bgColor="#B1B1B0"
                    onChangeText={(e) => { handleChange("gender")(e); seterrorFormAPI(); }}
                    onBlur={handleBlur("gender")}

                    validate={handleBlur("gender")}
                    outlined
                    borderColor={`${(errors.gender && touched.gender) || (errorFormAPI && errorFormAPI.genderForm) ? "red" : "#ccc"}`}
                    errorMessage={`${(errors.gender && touched.gender) ? `${errors.gender}` : (errorFormAPI && errorFormAPI.genderForm) ? `${errorFormAPI.genderForm}` : ``}`}
                    // errorColor='magenta'
                    value={values.gender}
                    items={genders}
                    onValueChange={(itemValue) => handleChange("gender")(itemValue)}
                    containerStyle={{ width: 200 }}
                    labelStyle={{ color: 'blue' }}
                    // pickerStyle={{ backgroundColor: '#f0f0f0' }}
                    error="Please select a gender"
                  />

                  <CustomTextInput
                    boxWidth={'30%'}
                    placeholder={'Age'}
                    asterisksymbol={true}
                    label={'Your age'}
                    name='Age'
                    value={values.age}
                    keyboardType="numeric"
                    // leftIcon={<FontAwesome name="phone" size={20} color="black" />}
                    onChangeText={(e) => { handleChange("age")(e); seterrorFormAPI(); }}
                    onBlur={handleBlur("age")}
                    validate={handleBlur("age")}
                    outlined
                    borderColor={`${(errors.age && touched.age) || (errorFormAPI && errorFormAPI.age) ? "red" : "#ccc"}`}
                    errorMessage={`${(errors.age && touched.age) ? `${errors.age}` : (errorFormAPI && errorFormAPI.age) ? `${errorFormAPI.age}` : ``}`}
                  // errorColor='magenta'
                  />

                </View>




                {/* {values.language === 'other' && (

                  <CustomTextInput
                    boxWidth={'80%'}
                    label={'Other Language'}
                    name='Other Language'
                    // value={values.personName}
                    value={otherLanguage}
                    onChangeText={handleOtherLanguageChange}
                    placeholder="Other Language"
                    onBlur={handleBlur("personName")}
                    validate={handleBlur("personName")}
                    outlined
                    borderColor={`${(errors.personName && touched.personName) || (errorFormAPI && errorFormAPI.personNameForm) ? "red" : "#ccc"}`}
                    errorMessage={`${(errors.personName && touched.personName) ? `${errors.personName}` : (errorFormAPI && errorFormAPI.personNameForm) ? `${errorFormAPI.personNameForm}` : ``}`}
                  // errorColor='magenta'
                  />
                )} */}
                <CustomTextInput
                  placeholder={'Enter your education'}
                  asterisksymbol={true}
                  boxWidth={'80%'}
                  label={'Education'}
                  name='Education'
                  value={values.education}
                  onChangeText={(e) => { handleChange("education")(e); seterrorFormAPI(); }}
                  onBlur={handleBlur("education")}
                  validate={handleBlur("education")}
                  outlined
                  borderColor={`${(errors.education && touched.education) || (errorFormAPI && errorFormAPI.educationForm) ? "red" : "#ccc"}`}
                  errorMessage={`${(errors.education && touched.education) ? `${errors.education}` : (errorFormAPI && errorFormAPI.educationForm) ? `${errorFormAPI.educationForm}` : ``}`}
                />

                {/* <Text>{errors.state}</Text> */}
                <CustomPicker
                  placeholder={'Enter your city'}
                  asterisksymbol={true}
                  boxWidth={'80%'}
                  label={'City'}
                  name='city'

                  onChangeText={(e) => { handleChange("state")(e); seterrorFormAPI(); }}
                  onBlur={handleBlur("state")}

                  validate={handleBlur("state")}
                  outlined
                  borderColor={`${(errors.state && touched.state) || (errorFormAPI && errorFormAPI.stateForm) ? "red" : "#ccc"}`}
                  errorMessage={`${(errors.state && touched.state) ? `${errors.state}` : (errorFormAPI && errorFormAPI.stateForm) ? `${errorFormAPI.stateForm}` : ``}`}
                  // errorColor='magenta'
                  value={values.state}
                  items={stateData}
                  onValueChange={(itemValue) => handleChange("state")(itemValue)}
                  containerStyle={{ width: 200 }}
                  labelStyle={{ color: 'blue' }}
                // pickerStyle={{ backgroundColor: '#f0f0f0' }}
                // error="Please select a referenceFrom"
                />

                {values.state === 'other' && (

                  <CustomTextInput
                    boxWidth={'80%'}
                    label={'Other city'}
                    name='Other city'
                    // value={values.personName}
                    value={otherState}
                    onChangeText={handleOtherStateChange}
                    placeholder="Other City"
                    onBlur={handleBlur("otherState")}
                    validate={handleBlur("otherState")}
                    outlined
                    borderColor={`${(errors.otherState && touched.otherState) || (errorFormAPI && errorFormAPI.otherStateForm) ? "red" : "#ccc"}`}
                    errorMessage={`${(errors.otherState && touched.otherState) ? `${errors.otherState}` : (errorFormAPI && errorFormAPI.otherStateForm) ? `${errorFormAPI.otherStateForm}` : ``}`}
                  // errorColor='magenta'
                  />
                )}


                <CustomTextInput
                  placeholder={'Enter your address'}
                  asterisksymbol={true}
                  boxWidth={'80%'}
                  label={'Address'}
                  name='Address'
                  value={values.address}
                  // leftIcon={<FontAwesome name="user" size={20} color="black" />}
                  // bgColor='#e1f3f8'
                  // bgColor="#B1B1B0"
                  onChangeText={(e) => { handleChange("address")(e); seterrorFormAPI(); }}
                  onBlur={handleBlur("address")}

                  validate={handleBlur("address")}
                  outlined
                  borderColor={`${(errors.address && touched.address) || (errorFormAPI && errorFormAPI.addressForm) ? "red" : "#ccc"}`}
                  errorMessage={`${(errors.address && touched.address) ? `${errors.address}` : (errorFormAPI && errorFormAPI.addressForm) ? `${errorFormAPI.addressForm}` : ``}`}
                  // errorColor='magenta'
                  numLines={4}
                />
                <CustomTextInput
                  placeholder={'Enter your father or spouse name'}
                  asterisksymbol={true}
                  boxWidth={'80%'}
                  label={'Father or spouse name'}
                  name='Father or spouse name'
                  value={values.guardianName}
                  onChangeText={(e) => { handleChange("guardianName")(e); seterrorFormAPI(); }}
                  onBlur={handleBlur("guardianName")}
                  validate={handleBlur("guardianName")}
                  outlined
                  borderColor={`${(errors.guardianName && touched.guardianName) || (errorFormAPI && errorFormAPI.guardianNameForm) ? "red" : "#ccc"}`}
                  errorMessage={`${(errors.guardianName && touched.guardianName) ? `${errors.guardianName}` : (errorFormAPI && errorFormAPI.guardianNameForm) ? `${errorFormAPI.guardianNameForm}` : ``}`}
                />
                <CustomPicker
                  placeholder={'Marital status'}
                  asterisksymbol={true}
                  boxWidth={'80%'}
                  label={'Marital status'}
                  name='Maritalstatus'
                  onChangeText={(e) => { handleChange("martialStatus")(e); seterrorFormAPI(); }}
                  onBlur={handleBlur("martialStatus")}
                  validate={handleBlur("martialStatus")}
                  outlined
                  borderColor={`${(errors.martialStatus) || (errorFormAPI && errorFormAPI.martialStatusForm) ? "red" : "#ccc"}`}
                  errorMessage={`${(errors.martialStatus) ? `${errors.martialStatus}` : (errorFormAPI && errorFormAPI.martialStatusForm) ? `${errorFormAPI.genderForm}` : ``}`}
                  value={values.martialStatus}
                  items={martialStatus}
                  onValueChange={(itemValue) => handleChange("martialStatus")(itemValue)}
                  containerStyle={{ width: 200 }}
                  labelStyle={{ color: 'blue' }}
                  error="Please select a gender"
                />
                <CustomPicker
                  placeholder={'Enter your language'}
                  asterisksymbol={true}
                  boxWidth={'80%'}
                  label={'Language'}
                  name='language'

                  onChangeText={(e) => { handleChange("language")(e); seterrorFormAPI(); }}
                  onBlur={handleBlur("language")}

                  validate={handleBlur("language")}
                  outlined
                  borderColor={`${(errors.language && touched.language) || (errorFormAPI && errorFormAPI.languageForm) ? "red" : "#ccc"}`}
                  errorMessage={`${(errors.language && touched.language) ? `${errors.language}` : (errorFormAPI && errorFormAPI.languageForm) ? `${errorFormAPI.languageForm}` : ``}`}
                  // errorColor='magenta'
                  value={values.language}
                  items={languageData}
                  onValueChange={(itemValue) => handleChange("language")(itemValue)}
                  containerStyle={{ width: 200 }}
                  labelStyle={{ color: 'blue' }}
                // pickerStyle={{ backgroundColor: '#f0f0f0' }}
                // error="Please select a referenceFrom"
                />



                <CustomTextInput
                  placeholder={'Mobile number'}
                  asterisksymbol={true}
                  boxWidth={'80%'}
                  label={'Mobile number'}
                  name='mobileNumber'
                  value={values.mobileNumber}
                  // leftIcon={<FontAwesome name="phone" size={20} color="black" />}
                  onChangeText={(e) => {
                    // Ensure only digits are entered
                    const input = e.replace(/\D/g, '');
                    // Restrict to 10 digits
                    const mobileNumber = input.slice(0, 10);
                    handleChange("mobileNumber")(mobileNumber);
                    seterrorFormAPI();
                  }}
                  keyboardType="numeric"
                  onBlur={handleBlur("mobileNumber")}
                  validate={handleBlur("mobileNumber")}
                  outlined
                  borderColor={`${(errors.mobileNumber && touched.mobileNumber) || (errorFormAPI && errorFormAPI.mobileNumberForm) ? "red" : "#ccc"}`}
                  errorMessage={`${(errors.mobileNumber && touched.mobileNumber) ? `${errors.mobileNumber}` : (errorFormAPI && errorFormAPI.mobileNumberForm) ? `${errorFormAPI.mobileNumberForm}` : ``}`}
                // errorColor='magenta'
                />

                <CustomTextInput
                  placeholder={'Enter your email'}
                  asterisksymbol={true}
                  boxWidth={'80%'}
                  label={'Email'}
                  name='Email'
                  value={values.eMail}
                  // leftIcon={<FontAwesome name="user" size={20} color="black" />}
                  // bgColor='#e1f3f8'
                  // bgColor="#B1B1B0"
                  // onChangeText={(e) => { handleChange("eMail")(e); seterrorFormAPI(); }}
                  onChangeText={(e) => { const eToLowerCaseText = e.toLowerCase(); handleChange("eMail")(eToLowerCaseText); seterrorFormAPI(); }}

                  onBlur={handleBlur("eMail")}

                  validate={handleBlur("eMail")}
                  outlined
                  borderColor={`${(errors.eMail && touched.eMail) || (errorFormAPI && errorFormAPI.eMailForm) ? "red" : "#ccc"}`}
                  errorMessage={`${(errors.eMail && touched.eMail) ? `${errors.eMail}` : (errorFormAPI && errorFormAPI.eMailForm) ? `${errorFormAPI.eMailForm}` : ``}`}
                // errorColor='magenta'
                />







                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>

                  {/* <Text>knownPerson Demo_line</Text> */}
                  <CustomTextInput
                    boxWidth={'80%'}
                    placeholder={'Is any known person attending the course'}
                    label={'Is any known person attending the course'}
                    name='Is any known person attending the course'
                    value={values.personName}
                    // leftIcon={<FontAwesome name="user" size={20} color="black" />}
                    // bgColor='#e1f3f8'
                    // bgColor="#B1B1B0"
                    onChangeText={(e) => { handleChange("personName")(e); seterrorFormAPI(); }}
                    onBlur={handleBlur("personName")}

                    validate={handleBlur("personName")}
                    outlined
                    borderColor={`${(errors.personName && touched.personName) || (errorFormAPI && errorFormAPI.personNameForm) ? "red" : "#ccc"}`}
                    errorMessage={`${(errors.personName && touched.personName) ? `${errors.personName}` : (errorFormAPI && errorFormAPI.personNameForm) ? `${errorFormAPI.personNameForm}` : ``}`}
                  // errorColor='magenta'
                  />

                  <CustomTextInput
                    boxWidth={'80%'}
                    placeholder={'Known person relation'}
                    label={'Known person relation'}
                    name='known person relation'
                    value={values.personRelation}
                    // leftIcon={<FontAwesome name="user" size={20} color="black" />}
                    // bgColor='#e1f3f8'
                    // bgColor="#B1B1B0"
                    onChangeText={(e) => { handleChange("personRelation")(e); seterrorFormAPI(); }}
                    onBlur={handleBlur("personRelation")}

                    validate={handleBlur("personRelation")}
                    outlined
                    borderColor={`${(errors.personRelation && touched.personRelation) || (errorFormAPI && errorFormAPI.personRelationForm) ? "red" : "#ccc"}`}
                    errorMessage={`${(errors.personRelation && touched.personRelation) ? `${errors.personRelation}` : (errorFormAPI && errorFormAPI.personRelationForm) ? `${errorFormAPI.personRelationForm}` : ``}`}
                  // errorColor='magenta'
                  />





                </View>
                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>


                  {/* <CustomTextInput
      boxWidth={'80%'}
      placeholder={'Family Person course Done'}
      label={'Family Person course Done'}
      name='Family Person course Done'
      value={values.courseDone}
      // leftIcon={<FontAwesome name="user" size={20} color="black" />}
      // bgColor='#e1f3f8'
      // bgColor="#B1B1B0"
      onChangeText={(e) => { handleChange("courseDone")(e); seterrorFormAPI(); }}
      onBlur={handleBlur("courseDone")}

      validate={handleBlur("courseDone")}
      outlined
      borderColor={`${(errors.courseDone && touched.courseDone) || (errorFormAPI && errorFormAPI.courseDoneForm) ? "red" : "#ccc"}`}
      errorMessage={`${(errors.courseDone && touched.courseDone) ? `${errors.courseDone}` : (errorFormAPI && errorFormAPI.courseDoneForm) ? `${errorFormAPI.courseDoneForm}` : ``}`}
    // errorColor='magenta'
    /> */}

                  <CustomPicker
                    //  asterisksymbol={true}
                    boxWidth={'80%'}
                    placeholder={'Has anyone in the family done a course?'}
                    label={'Has anyone in the family done a course?'}
                    name='Family Person course Done'

                    // leftIcon={<FontAwesome name="user" size={20} color="black" />}
                    // bgColor='#e1f3f8'
                    // bgColor="#B1B1B0"
                    onChangeText={(e) => { handleChange("courseDone")(e); seterrorFormAPI(); }}
                    onBlur={handleBlur("courseDone")}

                    validate={handleBlur("courseDone")}
                    outlined
                    borderColor={`${(errors.courseDone && touched.courseDone) || (errorFormAPI && errorFormAPI.courseDoneForm) ? "red" : "#ccc"}`}
                    errorMessage={`${(errors.courseDone && touched.courseDone) ? `${errors.courseDone}` : (errorFormAPI && errorFormAPI.courseDoneForm) ? `${errorFormAPI.courseDoneForm}` : ``}`}
                    // errorColor='magenta'
                    value={values.courseDone}
                    items={courseDoneList}
                    onValueChange={(itemValue) => handleChange("courseDone")(itemValue)}
                    containerStyle={{ width: 200 }}
                    labelStyle={{ color: 'blue' }}
                  // pickerStyle={{ backgroundColor: '#f0f0f0' }}
                  // error="Please select a referenceFrom"
                  />

                  {values.courseDone === "yes" ? <CustomTextInput
                    boxWidth={'80%'}
                    placeholder={"Family person's relation"}
                    label={"Family person's relation"}
                    name='Family person relation'
                    value={values.relation}
                    // leftIcon={<FontAwesome name="user" size={20} color="black" />}
                    // bgColor='#e1f3f8'
                    // bgColor="#B1B1B0"
                    onChangeText={(e) => { handleChange("relation")(e); seterrorFormAPI(); }}
                    onBlur={handleBlur("relation")}

                    validate={handleBlur("relation")}
                    outlined
                    borderColor={`${(errors.relation && touched.relation) || (errorFormAPI && errorFormAPI.relationForm) ? "red" : "#ccc"}`}
                    errorMessage={`${(errors.relation && touched.relation) ? `${errors.relation}` : (errorFormAPI && errorFormAPI.relationForm) ? `${errorFormAPI.relationForm}` : ``}`}
                  // errorColor='magenta'
                  /> : ""}

                </View>



                <Text style={{ fontWeight: 800, fontSize: 15 }}>------- Professional Details -------</Text>

                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>

                  <CustomTextInput
                    boxWidth={'80%'}
                    placeholder={'Designation'}
                    label={'Designation'}
                    name='Professional details designation'
                    value={values.designation}
                    // leftIcon={<FontAwesome name="user" size={20} color="black" />}
                    // bgColor='#e1f3f8'
                    // bgColor="#B1B1B0"
                    onChangeText={(e) => { handleChange("designation")(e); seterrorFormAPI(); }}
                    onBlur={handleBlur("designation")}

                    validate={handleBlur("designation")}
                    outlined
                    borderColor={`${(errors.designation && touched.designation) || (errorFormAPI && errorFormAPI.designationForm) ? "red" : "#ccc"}`}
                    errorMessage={`${(errors.designation && touched.designation) ? `${errors.designation}` : (errorFormAPI && errorFormAPI.designationForm) ? `${errorFormAPI.designationForm}` : ``}`}
                  // errorColor='magenta'
                  />



                  <CustomTextInput
                    boxWidth={'80%'}
                    placeholder={'Company name'}
                    label={'Company name'}
                    name='companyName'
                    value={values.companyName}
                    // leftIcon={<FontAwesome name="user" size={20} color="black" />}
                    // bgColor='#e1f3f8'
                    // bgColor="#B1B1B0"
                    onChangeText={(e) => { handleChange("companyName")(e); seterrorFormAPI(); }}
                    onBlur={handleBlur("companyName")}

                    validate={handleBlur("companyName")}
                    outlined
                    borderColor={`${(errors.companyName && touched.companyName) || (errorFormAPI && errorFormAPI.companyNameForm) ? "red" : "#ccc"}`}
                    errorMessage={`${(errors.companyName && touched.companyName) ? `${errors.companyName}` : (errorFormAPI && errorFormAPI.companyNameForm) ? `${errorFormAPI.companyNameForm}` : ``}`}
                  // errorColor='magenta'
                  />

                  <CustomTextInput
                    boxWidth={'80%'}
                    placeholder={'Company address'}
                    label={'Company address'}
                    name='Company address'
                    value={values.companyAddress}
                    // leftIcon={<FontAwesome name="user" size={20} color="black" />}
                    // bgColor='#e1f3f8'
                    // bgColor="#B1B1B0"
                    onChangeText={(e) => { handleChange("companyAddress")(e); seterrorFormAPI(); }}
                    onBlur={handleBlur("companyAddress")}

                    validate={handleBlur("companyAddress")}
                    outlined
                    borderColor={`${(errors.companyAddress && touched.companyAddress) || (errorFormAPI && errorFormAPI.companyAddressForm) ? "red" : "#ccc"}`}
                    errorMessage={`${(errors.companyAddress && touched.companyAddress) ? `${errors.companyAddress}` : (errorFormAPI && errorFormAPI.companyAddressForm) ? `${errorFormAPI.companyAddressForm}` : ``}`}
                  // errorColor='magenta'
                  />
                </View>
                {/* <Text>professional Details Demo_line end</Text> */}


                <Text style={{ fontWeight: 800, fontSize: 15, marginBottom: 2 }}>------- Any Physical Ailment? -------</Text>
                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>

                  <CustomTextInput
                    boxWidth={'80%'}
                    placeholder={'In past'}
                    label={'In past'}
                    name='In past'
                    value={values.inPastOne}
                    // leftIcon={<FontAwesome name="user" size={20} color="black" />}
                    // bgColor='#e1f3f8'
                    // bgColor="#B1B1B0"
                    onChangeText={(e) => { handleChange("inPastOne")(e); seterrorFormAPI(); }}
                    onBlur={handleBlur("inPastOne")}

                    validate={handleBlur("inPastOne")}
                    outlined
                    borderColor={`${(errors.inPastOne && touched.inPastOne) || (errorFormAPI && errorFormAPI.inPastOneForm) ? "red" : "#ccc"}`}
                    errorMessage={`${(errors.inPastOne && touched.inPastOne) ? `${errors.inPastOne}` : (errorFormAPI && errorFormAPI.inPastOneForm) ? `${errorFormAPI.inPastOneForm}` : ``}`}
                  // errorColor='magenta'
                  />

                  <CustomTextInput
                    boxWidth={'80%'}
                    placeholder={'In present'}
                    label={'In present'}
                    name='In present one'
                    value={values.inPresentOne}
                    // leftIcon={<FontAwesome name="user" size={20} color="black" />}
                    // bgColor='#e1f3f8'
                    // bgColor="#B1B1B0"
                    onChangeText={(e) => { handleChange("inPresentOne")(e); seterrorFormAPI(); }}
                    onBlur={handleBlur("inPresentOne")}

                    validate={handleBlur("inPresentOne")}
                    outlined
                    borderColor={`${(errors.inPresentOne && touched.inPresentOne) || (errorFormAPI && errorFormAPI.inPresentOneForm) ? "red" : "#ccc"}`}
                    errorMessage={`${(errors.inPresentOne && touched.inPresentOne) ? `${errors.inPresentOne}` : (errorFormAPI && errorFormAPI.inPresentOneForm) ? `${errorFormAPI.inPresentOneForm}` : ``}`}
                  // errorColor='magenta'
                  />

                </View>


                <Text style={{ fontWeight: 800, fontSize: 15, marginTop: 5, marginBottom: 5 }}>- Any Psyschological Ailment/Addiction? -</Text>

                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>


                  <CustomPicker
                    boxWidth={'80%'}
                    placeholder={'In past '}
                    label={'In past '}
                    name='Psyschological ailment in past'
                    // value={values.gender}
                    // leftIcon={<FontAwesome name="user" size={20} color="black" />}
                    // bgColor='#e1f3f8'
                    // bgColor="#B1B1B0"
                    onChangeText={(e) => { handleChange("inPastTwo")(e); seterrorFormAPI(); }}

                    onBlur={handleBlur("inPastTwo")}

                    validate={handleBlur("inPastTwo")}

                    outlined
                    borderColor={`${(errors.inPastTwo && touched.inPastTwo) || (errorFormAPI && errorFormAPI.inPastTwoForm) ? "red" : "#ccc"}`}
                    errorMessage={`${(errors.inPastTwo && touched.inPastTwo) ? `${errors.inPastTwo}` : (errorFormAPI && errorFormAPI.inPastTwoForm) ? `${errorFormAPI.inPastTwoForm}` : ``}`}
                    // errorColor='magenta'
                    value={values.inPastTwo}
                    items={inPastTwoData}
                    onValueChange={(itemValue) => handleChange("inPastTwo")(itemValue)}
                    containerStyle={{ width: 200 }}
                    labelStyle={{ color: 'blue' }}
                  // pickerStyle={{ backgroundColor: '#f0f0f0' }}
                  // error="Please select a gender"
                  />

                  <CustomPicker
                    boxWidth={'80%'}
                    placeholder={'In present'}
                    label={'In present '}
                    name='In present '

                    // value={values.gender}
                    // leftIcon={<FontAwesome name="user" size={20} color="black" />}
                    // bgColor='#e1f3f8'
                    // bgColor="#B1B1B0"
                    onChangeText={(e) => { handleChange("inPresentTwo")(e); seterrorFormAPI(); }}
                    onBlur={handleBlur("inPresentTwo")}

                    validate={handleBlur("inPresentTwo")}
                    outlined
                    borderColor={`${(errors.inPresentTwo && touched.inPresentTwo) || (errorFormAPI && errorFormAPI.inPresentTwoForm) ? "red" : "#ccc"}`}
                    errorMessage={`${(errors.inPresentTwo && touched.inPresentTwo) ? `${errors.inPresentTwo}` : (errorFormAPI && errorFormAPI.inPresentTwoForm) ? `${errorFormAPI.inPresentTwoForm}` : ``}`}
                    // errorColor='magenta'
                    value={values.inPresentTwo}
                    items={inPresentTwoData}
                    onValueChange={(itemValue) => handleChange("inPresentTwo")(itemValue)}
                    containerStyle={{ width: 200 }}
                    labelStyle={{ color: 'blue' }}
                  // pickerStyle={{ backgroundColor: '#f0f0f0' }}
                  // error="Please select a gender"
                  />




                </View>

                {/* <Text> is present {values.inPresentTwo}</Text> */}
                {/* <Text> is inPast {values.inPastTwo}</Text> */}
                {/* <Text style={{ fontWeight: 800, fontSize: 15, marginTop: 5, marginBottom: 5 }}>------- Fitness Certificate -------</Text> */}
                {values.inPresentTwo === "Yes" || values.inPastTwo === "Yes" ? <CustomPicker
                  placeholder={'If yes, kindly bring a fitness certificate from your doctor'}
                  asterisksymbol={true}
                  boxWidth={'80%'}
                  label={'If yes, kindly bring a fitness certificate from your doctor'}
                  name='Anyfitnesscertificate' 
                  // value={values.gender}
                  // leftIcon={<FontAwesome name="user" size={20} color="black" />}
                  // bgColor='#e1f3f8'
                  // bgColor="#B1B1B0"
                  onChangeText={(e) => { handleChange("FitnessCertificate")(e); seterrorFormAPI(); }}
                  onBlur={handleBlur("FitnessCertificate")}

                  validate={handleBlur("FitnessCertificate")}
                  outlined
                  borderColor={`${(errors.FitnessCertificate && touched.FitnessCertificate) || (errorFormAPI && errorFormAPI.regularMedicineForm) ? "red" : "#ccc"}`}
                  errorMessage={`${(errors.FitnessCertificate && touched.FitnessCertificate) ? `${errors.FitnessCertificate}` : (errorFormAPI && errorFormAPI.FitnessCertificateForm) ? `${errorFormAPI.FitnessCertificateForm}` : ``}`}
                  // errorColor='magenta'
                  value={values.FitnessCertificate}
                  items={FitnessCertificateData}
                  onValueChange={(itemValue) => handleChange("FitnessCertificate")(itemValue)}
                  containerStyle={{ width: 200 }}
                  labelStyle={{ color: 'blue' }}
                // pickerStyle={{ backgroundColor: '#f0f0f0' }}
                // error="Please select a gender"
                /> : ""}


                {values.FitnessCertificate === "Yes" ?
                  <CustomTextInput
                    boxWidth={'80%'}
                    placeholder={'Name of medicine'}
                    label={'Name of medicine'}
                    name='docFitnessCertificate medicine Name'
                    value={values.medicineName}
                    // leftIcon={<FontAwesome name="user" size={20} color="black" />}
                    // bgColor='#e1f3f8'
                    // bgColor="#B1B1B0"
                    onChangeText={(e) => { handleChange("medicineName")(e); seterrorFormAPI(); }}
                    onBlur={handleBlur("medicineName")}

                    validate={handleBlur("medicineName")}
                    outlined
                    // borderColor={"red"}
                    borderColor={`${(errors.medicineName && touched.medicineName) || (errorFormAPI && errorFormAPI.medicineNameForm) ? "red" : "#ccc"}`}
                    errorMessage={`${(errors.medicineName && touched.medicineName) ? `${errors.medicineName}` : (errorFormAPI && errorFormAPI.medicineNameForm) ? `${errorFormAPI.medicineNameForm}` : ``}`}
                  // errorColor='magenta'
                  /> : ""}

                {values.FitnessCertificate === "Yes" ?
                  <CustomTextInput
                    boxWidth={'80%'}
                    placeholder={'Dose of medicine'}
                    label={'Dose of medicine'}
                    name='docFitnessCertificate medicine Dose'
                    value={values.medicineDose}
                    // leftIcon={<FontAwesome name="user" size={20} color="black" />}
                    // bgColor='#e1f3f8'
                    // bgColor="#B1B1B0"
                    onChangeText={(e) => { handleChange("medicineDose")(e); seterrorFormAPI(); }}
                    onBlur={handleBlur("medicineDose")}

                    validate={handleBlur("medicineDose")}
                    outlined
                    borderColor={`${(errors.medicineDose && touched.medicineDose) || (errorFormAPI && errorFormAPI.medicineDoseForm) ? "red" : "#ccc"}`}
                    errorMessage={`${(errors.medicineDose && touched.medicineDose) ? `${errors.medicineDose}` : (errorFormAPI && errorFormAPI.medicineDoseForm) ? `${errorFormAPI.medicineDoseForm}` : ``}`}
                  // errorColor='magenta'
                  /> : ""}

                {/* <Text>Family Person Demo_line</Text>  <Text>Family Person end Demo_line</Text> */}



                {values.FitnessCertificate === "Yes" ?
                  <CustomPicker
                    placeholder={'If taking any medicine regularly have you brought it with you?'}
                    asterisksymbol={true}
                    boxWidth={'80%'}
                    label={'If taking any medicine regularly have you brought it with you?'}
                    name='regularMedicine'
                    // value={values.gender}
                    // leftIcon={<FontAwesome name="user" size={20} color="black" />}
                    // bgColor='#e1f3f8'
                    // bgColor="#B1B1B0"
                    onChangeText={(e) => { handleChange("regularMedicine")(e); seterrorFormAPI(); }}
                    onBlur={handleBlur("regularMedicine")}

                    validate={handleBlur("regularMedicine")}
                    outlined
                    borderColor={`${(errors.regularMedicine && touched.regularMedicine) || (errorFormAPI && errorFormAPI.regularMedicineForm) ? "red" : "#ccc"}`}
                    errorMessage={`${(errors.regularMedicine && touched.regularMedicine) ? `${errors.regularMedicine}` : (errorFormAPI && errorFormAPI.regularMedicineForm) ? `${errorFormAPI.regularMedicineForm}` : ``}`}
                    // errorColor='magenta'
                    value={values.regularMedicine}
                    items={regularMedicineData}
                    onValueChange={(itemValue) => handleChange("regularMedicine")(itemValue)}
                    containerStyle={{ width: 200 }}
                    labelStyle={{ color: 'blue' }}
                  // pickerStyle={{ backgroundColor: '#f0f0f0' }}
                  // error="Please select a gender"
                  /> : ""}

                <CustomPicker
                  // placeholder={'Referred by'}
                  asterisksymbol={true}
                  boxWidth={'80%'}
                  label={'How did you learn about this course'}
                  name='Referred By'

                  onChangeText={(e) => { handleChange("referenceFrom")(e); seterrorFormAPI(); }}
                  onBlur={handleBlur("referenceFrom")}

                  validate={handleBlur("referenceFrom")}
                  outlined
                  borderColor={`${(errors.referenceFrom && touched.referenceFrom) || (errorFormAPI && errorFormAPI.referenceFromForm) ? "red" : "#ccc"}`}
                  errorMessage={`${(errors.referenceFrom && touched.referenceFrom) ? `${errors.referenceFrom}` : (errorFormAPI && errorFormAPI.referenceFromForm) ? `${errorFormAPI.referenceFromForm}` : ``}`}
                  // errorColor='magenta'
                  value={values.referenceFrom}
                  items={referenceFromData}
                  onValueChange={(itemValue) => handleChange("referenceFrom")(itemValue)}
                  containerStyle={{ width: 200 }}
                  labelStyle={{ color: 'blue' }}
                // pickerStyle={{ backgroundColor: '#f0f0f0' }}
                // error="Please select a referenceFrom"
                />

                {/* <Text>medical name</Text>
                <Text>medical Dose</Text>
                <Text>medical name</Text> */}
                <CustomTextInput
                  // placeholder={'Enter more information data'}
                  asterisksymbol={true}
                  boxWidth={'80%'}
                  label={'Brief personal background aim of joining the course'}
                  name='brief'
                  value={values.brief}
                  // leftIcon={<FontAwesome name="user" size={20} color="black" />}
                  // bgColor='#e1f3f8'
                  // bgColor="#B1B1B0"
                  onChangeText={(e) => { handleChange("brief")(e); seterrorFormAPI(); }}
                  onBlur={handleBlur("brief")}

                  validate={handleBlur("brief")}
                  outlined
                  borderColor={`${(errors.brief && touched.brief) || (errorFormAPI && errorFormAPI.briefForm) ? "red" : "#ccc"}`}
                  errorMessage={`${(errors.brief && touched.brief) ? `${errors.brief}` : (errorFormAPI && errorFormAPI.briefForm) ? `${errorFormAPI.briefForm}` : ``}`}
                  // errorColor='magenta'
                  numLines={4}
                />








                <Text style={{ fontWeight: 800, fontSize: 15, marginTop: 5, marginBottom: 5 }}>--- To be filled in only by old student ---</Text>
                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                  <CustomTextInput
                    boxWidth={'80%'}
                    placeholder={'Name of old student'}
                    label={'Name of old student'}
                    name='Old Student Name'
                    value={values.oldStuName}
                    // leftIcon={<FontAwesome name="user" size={20} color="black" />}
                    // bgColor='#e1f3f8'
                    // bgColor="#B1B1B0"
                    onChangeText={(e) => { handleChange("oldStuName")(e); seterrorFormAPI(); }}
                    onBlur={handleBlur("oldStuName")}

                    validate={handleBlur("oldStuName")}
                    outlined
                    borderColor={`${(errors.oldStuName && touched.oldStuName) || (errorFormAPI && errorFormAPI.oldStuNameForm) ? "red" : "#ccc"}`}
                    errorMessage={`${(errors.oldStuName && touched.oldStuName) ? `${errors.oldStuName}` : (errorFormAPI && errorFormAPI.oldStuNameForm) ? `${errorFormAPI.oldStuNameForm}` : ``}`}
                  // errorColor='magenta'
                  />

                  <CustomTextInput
                    boxWidth={'80%'}
                    placeholder={'First course place'}
                    label={'First course place'}
                    name='First Course Place'
                    value={values.firstCoursePlace}
                    // leftIcon={<FontAwesome name="user" size={20} color="black" />}
                    // bgColor='#e1f3f8'
                    // bgColor="#B1B1B0"
                    onChangeText={(e) => { handleChange("firstCoursePlace")(e); seterrorFormAPI(); }}
                    onBlur={handleBlur("firstCoursePlace")}

                    validate={handleBlur("firstCoursePlace")}
                    outlined
                    borderColor={`${(errors.firstCoursePlace && touched.firstCoursePlace) || (errorFormAPI && errorFormAPI.firstCoursePlaceForm) ? "red" : "#ccc"}`}
                    errorMessage={`${(errors.firstCoursePlace && touched.firstCoursePlace) ? `${errors.firstCoursePlace}` : (errorFormAPI && errorFormAPI.firstCoursePlaceForm) ? `${errorFormAPI.firstCoursePlaceForm}` : ``}`}
                  // errorColor='magenta'
                  />

                  <CustomTextInput
                    boxWidth={'80%'}
                    placeholder={'First Assist Teacher'}
                    label={'First Assist Teacher'}
                    name='First asst Teacher'
                    value={values.firstAsstTeacher}
                    // leftIcon={<FontAwesome name="user" size={20} color="black" />}
                    // bgColor='#e1f3f8'
                    // bgColor="#B1B1B0"
                    onChangeText={(e) => { handleChange("firstAsstTeacher")(e); seterrorFormAPI(); }}
                    onBlur={handleBlur("firstAsstTeacher")}

                    validate={handleBlur("firstAsstTeacher")}
                    outlined
                    borderColor={`${(errors.firstAsstTeacher && touched.firstAsstTeacher) || (errorFormAPI && errorFormAPI.firstAsstTeacherForm) ? "red" : "#ccc"}`}
                    errorMessage={`${(errors.firstAsstTeacher && touched.firstAsstTeacher) ? `${errors.firstAsstTeacher}` : (errorFormAPI && errorFormAPI.firstAsstTeacherForm) ? `${errorFormAPI.firstAsstTeacherForm}` : ``}`}
                  // errorColor='magenta'
                  />

                  <View style={{ justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center', width: '90%' }}>
                    <CustomDateInput
                      placeholder={'First course date'}
                      label={'First course date'}
                      name='First course date'
                      value={values.dateFirstCourse}
                      leftIcon={<MaterialIcons name="date-range" size={20} color="black" />}
                      // bgColor='#e1f3f8'
                      // bgColor="#B1B1B0"

                      // onChangeText={onChangeText}
                      onChangeText={(e) => { handleChange("dateFirstCourse")(e); setCourseDate(e); seterrorFormAPI(); }}
                      onBlur={handleBlur("dateFirstCourse")}
                      boxWidth={"40%"}
                      validate={handleBlur("dateFirstCourse")}
                      outlined
                      borderColor={`${(errors.dateFirstCourse && touched.dateFirstCourse) || (errorFormAPI && errorFormAPI.dateFirstCourseForm) ? "red" : "#ccc"}`}
                      errorMessage={`${(errors.dateFirstCourse && touched.dateFirstCourse) ? `${errors.dateFirstCourse}` : (errorFormAPI && errorFormAPI.dateFirstCourseForm) ? `${errorFormAPI.dateFirstCourseForm}` : ``}`}
                      // errorColor='magenta'
                      minimumDate={new Date(1990, 1, 1)}
                      maximumDate={new Date(2100, 10, 20)}
                    />


                    <CustomDateInput
                      placeholder={'Last course date'}
                      label={'Last course date'}
                      name='Last course date'
                      value={values.dateLastCourse}
                      leftIcon={<MaterialIcons name="date-range" size={20} color="black" />}
                      // bgColor='#e1f3f8'
                      // bgColor="#B1B1B0"

                      // onChangeText={onChangeText}
                      onChangeText={(e) => { handleChange("dateLastCourse")(e); seterrorFormAPI(); }}
                      onBlur={handleBlur("dateLastCourse")}
                      boxWidth={"40%"}
                      validate={handleBlur("dateLastCourse")}
                      outlined
                      borderColor={`${(errors.dateLastCourse && touched.dateLastCourse) || (errorFormAPI && errorFormAPI.dateLastCourseForm) ? "red" : "#ccc"}`}
                      errorMessage={`${(errors.dateLastCourse && touched.dateLastCourse) ? `${errors.dateLastCourse}` : (errorFormAPI && errorFormAPI.dateLastCourseForm) ? `${errorFormAPI.dateLastCourseForm}` : ``}`}
                      // errorColor='magenta'
                      minimumDate={minvalueofcourseDate}
                      maximumDate={new Date(2100, 10, 20)}
                    />

                  </View>





                  <CustomTextInput
                    boxWidth={'80%'}
                    placeholder={'Last course place'}
                    label={'Last course place'}
                    name='last course place'
                    value={values.lastCoursePlace}
                    // leftIcon={<FontAwesome name="user" size={20} color="black" />}
                    // bgColor='#e1f3f8'
                    // bgColor="#B1B1B0"
                    onChangeText={(e) => { handleChange("lastCoursePlace")(e); seterrorFormAPI(); }}
                    onBlur={handleBlur("lastCoursePlace")}

                    validate={handleBlur("lastCoursePlace")}
                    outlined
                    borderColor={`${(errors.lastCoursePlace && touched.lastCoursePlace) || (errorFormAPI && errorFormAPI.lastCoursePlaceForm) ? "red" : "#ccc"}`}
                    errorMessage={`${(errors.lastCoursePlace && touched.lastCoursePlace) ? `${errors.lastCoursePlace}` : (errorFormAPI && errorFormAPI.lastCoursePlaceForm) ? `${errorFormAPI.lastCoursePlaceForm}` : ``}`}
                  // errorColor='magenta'
                  />

                  <CustomTextInput
                    boxWidth={'80%'}
                    placeholder={'Last Assist Teacher'}
                    label={'Last Assist Teacher'}
                    name='last asst teacher'
                    value={values.lastAsstTeacher}
                    // leftIcon={<FontAwesome name="user" size={20} color="black" />}
                    // bgColor='#e1f3f8'
                    // bgColor="#B1B1B0"
                    onChangeText={(e) => { handleChange("lastAsstTeacher")(e); seterrorFormAPI(); }}
                    onBlur={handleBlur("lastAsstTeacher")}

                    validate={handleBlur("lastAsstTeacher")}
                    outlined
                    borderColor={`${(errors.lastAsstTeacher && touched.lastAsstTeacher) || (errorFormAPI && errorFormAPI.lastAsstTeacherForm) ? "red" : "#ccc"}`}
                    errorMessage={`${(errors.lastAsstTeacher && touched.lastAsstTeacher) ? `${errors.lastAsstTeacher}` : (errorFormAPI && errorFormAPI.lastAsstTeacherForm) ? `${errorFormAPI.lastAsstTeacherForm}` : ``}`}
                  // errorColor='magenta'
                  />

                  <CustomPicker
                    placeholder={'Enter course details'}
                    boxWidth={'80%'}
                    label={'Course details'}
                    name='Course Details'

                    onChangeText={(e) => { handleChange("courseDetails")(e); seterrorFormAPI(); }}
                    onBlur={handleBlur("courseDetails")}

                    validate={handleBlur("courseDetails")}
                    outlined
                    borderColor={`${(errors.courseDetails && touched.courseDetails) || (errorFormAPI && errorFormAPI.courseDetailsForm) ? "red" : "#ccc"}`}
                    errorMessage={`${(errors.courseDetails && touched.courseDetails) ? `${errors.courseDetails}` : (errorFormAPI && errorFormAPI.courseDetailsForm) ? `${errorFormAPI.courseDetailsForm}` : ``}`}
                    // errorColor='magenta'
                    value={values.courseDetails}
                    items={courseDetailsData}
                    onValueChange={(itemValue) => handleChange("courseDetails")(itemValue)}
                    containerStyle={{ width: 200 }}
                    labelStyle={{ color: 'blue' }}
                    // pickerStyle={{ backgroundColor: '#f0f0f0' }}
                    error="Please select a courseDetails"
                  />










                  <CustomTextInput
                    placeholder={'Have you tried any practice since the last course?'}
                    boxWidth={'80%'}
                    label={'Have you tried any practice since the last course?'}
                    name='Tried Any Practise'
                    value={values.triedAnyPractise}
                    // leftIcon={<FontAwesome name="user" size={20} color="black" />}
                    // bgColor='#e1f3f8'
                    // bgColor="#B1B1B0"
                    onChangeText={(e) => { handleChange("triedAnyPractise")(e); seterrorFormAPI(); }}
                    onBlur={handleBlur("triedAnyPractise")}

                    validate={handleBlur("triedAnyPractise")}
                    outlined
                    borderColor={`${(errors.triedAnyPractise && touched.triedAnyPractise) || (errorFormAPI && errorFormAPI.triedAnyPractiseForm) ? "red" : "#ccc"}`}
                    errorMessage={`${(errors.triedAnyPractise && touched.triedAnyPractise) ? `${errors.triedAnyPractise}` : (errorFormAPI && errorFormAPI.triedAnyPractiseForm) ? `${errorFormAPI.triedAnyPractiseForm}` : ``}`}
                  // errorColor='magenta'
                  // numLines={2}
                  />


                  <CustomPicker
                    placeholder={'Do you practice this technique regularly?'}
                    boxWidth={'80%'}
                    label={'Do you practice this technique regularly?'}
                    name='Practise regularly'

                    onChangeText={(e) => { handleChange("practiseRegularly")(e); seterrorFormAPI(); }}
                    onBlur={handleBlur("practiseRegularly")}

                    validate={handleBlur("practiseRegularly")}
                    outlined
                    borderColor={`${(errors.practiseRegularly && touched.practiseRegularly) || (errorFormAPI && errorFormAPI.practiseRegularlyForm) ? "red" : "#ccc"}`}
                    errorMessage={`${(errors.practiseRegularly && touched.practiseRegularly) ? `${errors.practiseRegularly}` : (errorFormAPI && errorFormAPI.practiseRegularlyForm) ? `${errorFormAPI.practiseRegularlyForm}` : ``}`}
                    // errorColor='magenta'
                    value={values.practiseRegularly}
                    items={practiseRegularlyData}
                    onValueChange={(itemValue) => handleChange("practiseRegularly")(itemValue)}
                    containerStyle={{ width: 200 }}
                    labelStyle={{ color: 'blue' }}
                    // pickerStyle={{ backgroundColor: '#f0f0f0' }}
                    error="Please select a practiseRegularly"
                  />

                  <CustomTextInput
                    placeholder={'How many hours daily? '}
                    boxWidth={'80%'}
                    label={'How many hours daily?'}
                    name='Daily Hours'
                    value={values.dailyHours}
                    // leftIcon={<FontAwesome name="user" size={20} color="black" />}
                    // bgColor='#e1f3f8'
                    // bgColor="#B1B1B0"
                    onChangeText={(e) => { handleChange("dailyHours")(e); seterrorFormAPI(); }}
                    onBlur={handleBlur("dailyHours")}

                    validate={handleBlur("dailyHours")}
                    outlined
                    borderColor={`${(errors.dailyHours && touched.dailyHours) || (errorFormAPI && errorFormAPI.dailyHoursForm) ? "red" : "#ccc"}`}
                    errorMessage={`${(errors.dailyHours && touched.dailyHours) ? `${errors.dailyHours}` : (errorFormAPI && errorFormAPI.dailyHoursForm) ? `${errorFormAPI.dailyHoursForm}` : ``}`}
                  // errorColor='magenta'
                  // numLines={2}
                  />


                  <CustomTextInput
                    placeholder={'If no, What is the reason?'}
                    boxWidth={'80%'}
                    label={'Reason?'}
                    name='Reason'
                    value={values.reason}
                    // leftIcon={<FontAwesome name="user" size={20} color="black" />}
                    // bgColor='#e1f3f8'
                    // bgColor="#B1B1B0"
                    onChangeText={(e) => { handleChange("reason")(e); seterrorFormAPI(); }}
                    onBlur={handleBlur("reason")}

                    validate={handleBlur("reason")}
                    outlined
                    borderColor={`${(errors.reason && touched.reason) || (errorFormAPI && errorFormAPI.reasonForm) ? "red" : "#ccc"}`}
                    errorMessage={`${(errors.reason && touched.reason) ? `${errors.reason}` : (errorFormAPI && errorFormAPI.reasonForm) ? `${errorFormAPI.reasonForm}` : ``}`}
                    // errorColor='magenta'
                    numLines={3}
                  />


                  <CustomTextInput
                    placeholder={'What changes have you noticed in yourself by the practice of meditation?'}
                    boxWidth={'80%'}
                    label={'What changes have you noticed in yourself by the practice of meditation?'}
                    name='Change In YourSelf'
                    value={values.changeInYourSelf}
                    // leftIcon={<FontAwesome name="user" size={20} color="black" />}
                    // bgColor='#e1f3f8'
                    // bgColor="#B1B1B0"
                    onChangeText={(e) => { handleChange("changeInYourSelf")(e); seterrorFormAPI(); }}
                    onBlur={handleBlur("changeInYourSelf")}

                    validate={handleBlur("changeInYourSelf")}
                    outlined
                    borderColor={`${(errors.changeInYourSelf && touched.changeInYourSelf) || (errorFormAPI && errorFormAPI.changeInYourSelfForm) ? "red" : "#ccc"}`}
                    errorMessage={`${(errors.changeInYourSelf && touched.changeInYourSelf) ? `${errors.changeInYourSelf}` : (errorFormAPI && errorFormAPI.changeInYourSelfForm) ? `${errorFormAPI.changeInYourSelfForm}` : ``}`}
                    // errorColor='magenta'
                    numLines={4}
                  />
                </View>


                {errors && (
                  <Text style={{ color: 'red' }}>
                    {Object.values(errors).join('\n')}
                  </Text>
                )}

                <CustomButton
                  onPress={ErrorChecker}
                  // leftIcon={<Entypo style={styles.icon} name={'Save'} size={18} color={'white'} />}
                  bgColor={`${!isValid ? "rgba(220, 142, 128, 0.9)" : "rgba(242, 142, 128, 1)"}`}

                  style={{ marginTop: 50 }}>
                  Save
                </CustomButton>



                <View style={{ marginBottom: 100 }}>

                </View>
              </>

            </View>
          </ScrollView>
          {/* </TouchableWithoutFeedback> */}
        </KeyboardAvoidingView>
      </MainComponent>


    </>
  );

}

const styles = StyleSheet.create({


  paragraphy: {
    // fontFamily: 'Jost',
    fontSize: 14,
    fontWeight: '300',
  },
  underline: {
    textDecorationLine: 'underline',
  }

})