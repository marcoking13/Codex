/*
 * Author: Project #1 Fire
 * Project Name: Project Fire sidbar JS
 * Version: Initialzed
 * Date: 08.29.17
 * URL: github.com/itsokayitsofficial/project1/
 */

$('.sidebar').on('click', function(event) {
	event.preventDefault();
	$(this).toggleClass("open");
});

var topic = [
	"HTML",
	"CSS",
	"Javascript",
	"Nodejs",
	"Mongo",
	"Java",
	"Swift",
	"React",
	"Python"
];
function renderQuiz(topic){
topic.map((subject)=>{

	console.log(subject);
		$("<a>").attr("href","#").addClass("quiz lefta").text(subject).appendTo(".sidebar-left")

})
}




renderQuiz(topic);
