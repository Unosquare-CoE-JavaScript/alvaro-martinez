function WorkShopModule(teacher) {
				var publicAPI = {ask, }
				return  publicAPI


				function ask(question) {
					console.log(teacher, question);
				}
}

var workshop = new WorkShopModule("Kyle")

workshop.ask("it's a module, rigth?")
