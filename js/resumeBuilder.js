/*
	Build four JSONs, each one representing a different resume section.
	Append each to the the resume.
*/

//JSON for bio section
var bio = {
	"name" : "Inna Novitskaya",
	"role" : "Front-End Web Developer",
	"contacts" : {
		"email" : "inna_novitskaya@yahoo.com",
		"mobile" : "+1-925-800-9061",
		"github" : "INLIBRA",
		"linkedin" : "innanovitskaya",
		"currentLocation" : "San Ramon, California",
		"previousLocations" : ["Waterloo, Canada", "Suwon, South Korea", "Saint Petersburg, Russia", "Seoul, South Korea", "Taganrog, Russia"]
	},
	"bioPic" : "images/me_crop_1.jpg",
	"welcomeMessage" : "Hi everyone! Welcome to my portfolio website.\n" +
	                   "I came to the Web Development from Math background." +
	                   "I taught high level Math courses for university students in the past. " +
	                   "I like to challenge myself and programming where I can put my analytical skills into work looks appealing to me. " +
	                   "Thus I completed several Front-End Development programs and courses " +
	                   "besides earning certificates in Java and C++ languages from UCSD Extension. " +
	                   "I believe that my knowledge and skills would be a good fit for an entry level  Front-End Development position.",
	"skills" : ["JavaScript", "JQuery", "HTML", "CSS", "Java", "C++"]
}


// append information about myself to header
var formattedEmail = HTMLemail.replace("%data%", bio.contacts.email);
var formattedMobile = HTMLmobile.replace("%data%", bio.contacts.mobile);
var formattedGithub = HTMLgithub.replace("%data%", bio.contacts.github);
var formattedLinkedin = HTMLlinkedin.replace("%data%", bio.contacts.linkedin);
var formattedLocation = HTMLlocation.replace("%data%", bio.contacts.currentLocation);
var formattedWelcomeMsg = HTMLwelcomeMsg.replace("%data%", bio.welcomeMessage);
var formattedBioPic = HTMLbioPic.replace("%data%", bio.bioPic);
var formattedName = HTMLheaderName.replace("%data%", bio.name);
var formattedRole = HTMLheaderRole.replace("%data%", bio.role);


$("#header").prepend(formattedName);
$("#header").prepend(formattedRole);
$("#topContacts").append(formattedEmail);
$("#topContacts").append(formattedMobile);
$("#topContacts").append(formattedGithub);
$("#topContacts").append(formattedLocation);
$("#header").append(formattedBioPic);
$("#header").append(formattedWelcomeMsg);

// if bio has skills append these skills to the header
var skills_length = bio.skills.length;

if (skills_length > 0) {
	$("#header").append(HTMLskillsStart);
	for (var i = 0; i < skills_length; i++) {
		var formattedSkills = HTMLskills.replace("%data%", bio.skills[i]);
		$("#skills").append(formattedSkills);
	}	
}


// append contact information to footer
$("#footerContacts").append(formattedEmail);
$("#footerContacts").append(formattedMobile);
$("#footerContacts").append(formattedGithub);
$("#footerContacts").append(formattedLinkedin);
$("#footerContacts").append(formattedLocation);

//JSON for education section
var education = {
	"schools" : [{
		"name" : "Taganrog State Pedagogical Institute",
		"location" : "Taganrog, Russia",
		"degree" : "Master Degree",
		"major" : "Mathematics and Physics",
		"dates" : "09/1992 - 06/1997",
		"url" : "http://www.tgpi.ru/"
		},
	],
	"certificates" : [
	    {
		    "name" : "University of California San Diego Extension",
			"program" : "Java Programming Certificate",
			"location" : "San Diego, CA",
			"dates" : "07/2013 - 09/2015",
			"url" : "http://extension.ucsd.edu/programs/index.cfm?vAction=certDetail&vCertificateID=55&vStudyAreaID=14"
	    },

	    {
		    "name" : "University of California San Diego Extension",
			"program" : "C++ Programming Certificate",
			"location" : "San Diego, CA",
			"dates" : "07/2013 - present",
			"url" : "http://extension.ucsd.edu/programs/index.cfm?vAction=certDetail&vCertificateID=23&vStudyAreaID=14"
	    },
	],
	"onlineCourses" : [
		{
            "title" : "Front-End Web Development Courses",
            "school" : "Udacity",
            "dates" : "06/2015 - 12/2015",
            "url" : "https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001"
		},
		{
            "title" : "Front-End Web Development Track",
            "school" : "Tree House",
            "dates" : "06/2015 - 12/2015",
            "url" : "https://teamtreehouse.com/tracks/front-end-web-development"
		},
		{
            "title" : "Front-End Web Development Courses",
            "school" : "CodeCademy",
            "dates" : "06/2015 - 12/2015",
            "url" : "https://www.codecademy.com"
		}
	]
}

//if education has schools append them to the education section
var schools_length = education.schools.length;

if (schools_length > 0) {
	for (var school in education.schools) {
		displaySchools();
	}	
}

function displaySchools() {

	$("#education").append(HTMLschoolStart);
    $(".education-entry:last").append(HTMLdegree);
	var formattedSchoolName = HTMLschoolName.replace("%data%", education.schools[school].url).replace("%data%", education.schools[school].name);
    $(".education-entry:last").append(formattedSchoolName);
    var formattedSchoolDegree = HTMLschoolDegree.replace("%data%", education.schools[school].degree);
    $(".education-entry:last").append(formattedSchoolDegree);
    var formattedSchoolDates = HTMLschoolDates.replace("%data%", education.schools[school].dates);
    $(".education-entry:last").append(formattedSchoolDates);
    var formattedSchoolLocation = HTMLschoolLocation.replace("%data%", education.schools[school].location);
    $(".education-entry:last").append(formattedSchoolLocation);
    var formattedSchoolMajor = HTMLschoolMajor.replace("%data%", education.schools[school].major);
    $(".education-entry:last").append(formattedSchoolMajor);	
}

//if education has certificates append them to the education section
var certificates_length = education.certificates.length;

$(".education-entry:last").append(HTMLonlineCertificates);

if (certificates_length > 0) {
	for (var certificate in education.certificates) {
		displayCertificates();
	}	
}

function displayCertificates() {
	var formattedCertificateSchool = HTMLcertificateSchool.replace("%data%", education.certificates[certificate].url).replace("%data%", education.certificates[certificate].name);
    $(".education-entry:last").append(formattedCertificateSchool);
    var formattedCertificateProgram = HTMLcertificateProgram.replace("%data%", education.certificates[certificate].program);
    $(".education-entry:last").append(formattedCertificateProgram);
    var formattedCertificateDates = HTMLcertificateDates.replace("%data%", education.certificates[certificate].dates);
    $(".education-entry:last").append(formattedCertificateDates);
    var formattedCertificateLocation = HTMLcertificateLocation.replace("%data%", education.certificates[certificate].location);
    $(".education-entry:last").append(formattedCertificateLocation);	
}

//if education has online courses append them to the education section
var courses_length = education.onlineCourses.length;

$(".education-entry:last").append(HTMLonlineClasses);

if (courses_length > 0) {
	for (var course in education.onlineCourses) {
		displayCourses();
	}	
}

function displayCourses() {

	var formattedCourseTitle = HTMLonlineTitle.replace("%data%", education.onlineCourses[course].url).replace("%data%", education.onlineCourses[course].title);
    $(".education-entry:last").append(formattedCourseTitle);
     var formattedOnlineDates = HTMLonlineDates.replace("%data%", education.onlineCourses[course].dates);
    $(".education-entry:last").append(formattedOnlineDates);
    var formattedOnlineSchool = HTMLonlineSchool.replace("%data%", education.onlineCourses[course].school);
    $(".education-entry:last").append(formattedOnlineSchool);
     	
}

//JSON for work section will be append later when jobs related to programming will exist

// var work = {"jobs" : [{
// 	"employer" : "YWCA",
// 	"title" : "Child Care Worker",
// 	"location" : "Waterloo, ON, Canada",
// 	"dates" : "09/2010 - 11/2012",
// 	"description" : "Prodive children with interactive activities" +
// 					" Prodive children with development programs"
// 	}, 
// 	{
// 		"employer" : "Institute of International Business",
// 		"title" : "Math Instructor",
// 		"location" : "Rostov-on-Don, Russia",
// 		"dates" : "02/2000 - 10/2003",
// 		"description" : "Prodive Math and Theory Probability Lectiries"
// 	}]}

// if jobs is not empty append jobs
// var work_length = work.jobs.length;

// if (work_length > 0) {
// 	for (var job in work.jobs) {
// 		displayWork();
// 	}	
// }

// function displayWork() {

// 	$("#workExperience").append(HTMLworkStart);
// 	var formattedEmployer = HTMLworkEmployer.replace("%data%", work.jobs[job].employer);
// 	var formattedworkTitle = HTMLworkTitle.replace("%data%", work.jobs[job].title);
//     $(".work-entry:last").append(formattedEmployer + formattedworkTitle);
// 	var formattedLocation = HTMLworkLocation.replace("%data%", work.jobs[job].location);
// 	$(".work-entry:last").append(formattedLocation);
// 	var formattedworkDates = HTMLworkDates.replace("%data%", work.jobs[job].dates);
// 	$(".work-entry:last").append(formattedworkDates);
// 	var formattedworkDescription = HTMLworkDescription.replace("%data%", work.jobs[job].description);
// 	$(".work-entry:last").append(formattedworkDescription);
// }

// JSON for projects section
var projects = {"projects" : [ { 
	                "title" : "Portfolio Website",
	                "dates" : "08/2015-10/2015",
	                "description" : "Portfolio is a coding from scratch website using HTML5, CSS3 and Bootstrap.",
	                "image" : "http://www.upcv.upatras.gr/images/projects_logo.png"
                }, {
                	"title" : "Interactive Resume",
                    "dates" : "09/2015-10/2015",
                    "description" : "Develop interactive resume application that reads and " +
                                    "displays dynamically my resume content from JSON file.",
                    "image" : "http://galaxyhit.wapath.com/images/our-projects-250x250.jpg"
                }]
            }

//if projects exist append them to the projects section
projects.display = function() {
	if (projects.projects.length > 0) {
		for (project in projects.projects) {
			$("#projects").append(HTMLprojectStart);
			var formattedProjectTitle = HTMLprojectTitle.replace("%data%", projects.projects[project].title);
			$(".project-entry:last").append(formattedProjectTitle);
			var formattedProjectDates = HTMLprojectDates.replace("%data%", projects.projects[project].dates);
			$(".project-entry:last").append(formattedProjectDates);
			var formattedProjectDescription = HTMLprojectDescription.replace("%data%", projects.projects[project].description);
			$(".project-entry:last").append(formattedProjectDescription);
			var formattedProjectImage = HTMLprojectImage.replace("%data%", projects.projects[project].image);
			$(".project-entry:last").append(formattedProjectImage);
		}	
	}
}

projects.display();

$("#mapDiv").append(googleMap);




