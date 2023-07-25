/* DRAGABLE SLIDDER */
// let slider = document.querySelector(".slider")
// let innerSlider = document.querySelector(".inner-slider")
// let pressed = false;
// let startx;
// let x;





// slider.addEventListener("mousedown", e=> {
//     slider.style.cursor = "grabbing"
//     pressed = true;
//     startx = e.offsetX-innerSlider.offsetLeft;
//     // alert(innerSlider.offsetLeft)

// })

// slider.addEventListener("mouseenter", e=> {
//     slider.style.cursor = "grab"
// })

// window.addEventListener("mouseup", e=> {
//     slider.style.cursor = "grab"
//     pressed = false;
// })

// slider.addEventListener("mousemove", e=> {
//     if(!pressed) return;
//     e.preventDefault();

//     x = e.offsetX;
//     innerSlider.style.left = `${x-startx}px`;

//     checkboundary();
// })

// checkboundary = function() {
//     let outer = slider.getBoundingClientRect();
//     let inner = innerSlider.getBoundingClientRect();
//     let left = innerSlider.style.left;
//     if(parseInt(left) > 0) {
//         innerSlider.style.left = "0px"
//     }else if(inner.right < outer.right) {
//         innerSlider.style.left = `-${inner.width - outer.width}px ,`
//     }

// }

/* END OF DRAGGABLE SLIDDER */

// // BUDGET CONTROLLER
// var budgetController = (function (){
//         // function constructor
//      var Income = function(id, description, value) {
//         this.id= id;
//         this.description = description;
//         this.value = value;
//     };

//     var Expense = function(id, description, value) {
//         this.id= id;
//         this.description = description;
//         this.value = value;
//         this.percentage = -1;
//     };

//     Expense.prototype.calculatePercentage = function(totalIncome) {
//         if (totalIncome > 0) {
//             this.percentage = Math.round((this.value/totalIncome)*100);
//         }else {
//             this.percentage = -1;
//         }
//     }

//     Expense.prototype.getPercentage = function() {
//         return this.percentage;
//     }

//     //function to calculate total
//     var calcTotal = function (type) {
//         var sum = 0;
//         data.allItems[type].forEach(function(cur) {
//             sum +=cur.value
//         });
//         data.totals[type] = sum;
//     }

//     //data structure
//     var data = {
//         allItems: {
//             inc: [],
//             exp: []
//         },
//         totals: {
//             inc: 0,
//             exp: 0
//         },

//         budget:0,
//         percent:-1

//     };

//     return {

//         addItem: function(type, des, val) {
//             var ID, newItem;
//              //check for last ID and adding one to it
//              if (data.allItems[type].length > 0) {
//                  ID = data.allItems[type][data.allItems[type].length-1].id + 1;
//              }else {
//                  ID = 0
//              }

//          // creating a new item for the type[either inc or exp]
//             if (type === 'inc') {
//                 newItem = new Income(ID, des, val);
//             } else if (type === 'exp') {
//                 newItem = new Expense (ID, des, val);
//             }

//             //adding the new items ino the data structure
//             data.allItems[type].push(newItem);

//             // return the new element
//             return newItem;
//         },

//         calculateBudget: function () {
//             //calc totalincome and expenses
//             calcTotal('exp');
//             calcTotal('inc');
//             //income - expense
//             data.budget = data.totals.inc - data.totals.exp
//             //calc percent
//             if (data.totals.inc > 0) {
//                 data.percent= Math.round((data.totals.exp/data.totals.inc)*100);
//             } else {
//                 data.percent = -1
//             }
//         },

//          getBudget: function() {
//             return {
//                 budget:data.budget,
//                 totalInc:data.totals.inc,
//                 totalExp:data.totals.exp,
//                 percentage:data.percent
//             }
//         },

//         calperc: function () {
//             data.allItems.exp.forEach(function(cur) {
//                 cur.calculatePercentage(data.totals.inc);
//             });
//         },

//          getperc: function() {
//            var getPerc = data.allItems.exp.map(function(cur) {
//                 return cur.getPercentage();
//             });

//             return getPerc;
//         },

//         deleteitem: function(type, id) {
//             var ids,index;
//             ids = data.allItems[type].map(function(cur) {
//                 return cur.id
//             });

//             index = ids.indexOf(id);
//             if (index!==-1) {
//                 data.allItems[type].splice(index,1);
//             }
//         },

//         testing: function () {
//             console.log(data);
//         },

//     };

// })();

// //UIContoller

// var UIController = (function(){

//     var DOMstrings = {
//         inputType: '.options',
//         inputDescription: '.descript',
//         inputValue: '.description-value',
//         a: 'bton',
//         incomeContainer: '.income-list',
//         expenseContainer: '.expense-list',
//         container: '.row2',
//     }

//     var formatNumber = function(num, type) {
//         var num,splitNum,int,dec;

//         num = Math.abs(num);
//         num = num.toFixed(2);

//         splitNum = num.split('.');
//         int = splitNum[0];
//         if (int.length>3)

//                 7899898,989
//         {int = int.substr(0, int.length-3) + ',' + int.substr(int.length-3, 3) ;}
//         dec = splitNum[1];
//         return (type === 'exp' ? '-':'+') + int + '.' + dec;
//     };

//     var nodeListForEach = function(list, callback) {
//         for (var i = 0; i < list.length; i++) {
//             callback(list[i], i)
//         }
//     };

//     return {
//         getInput: function () {
//             return {
//             type: document.querySelector(DOMstrings.inputType).value,
//             description: document.querySelector(DOMstrings.inputDescription).value,
//             value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
//            };
//         },

//         addListItem: function (obj, type) {
//             // create Html strings
//             var element, html, newHtml, incomeContainer;
//             incomeContainer = '.income-list'
//             if (type === 'inc') {
//                 element = incomeContainer;
//                 html= '<div class="item clearfix"  id="inc-%id%"><div class="item-description">%description%</div><div class="right"><div class="item-value inc">%value%</div><div class="item-delete"><button><i class="ion-ios-close-outline btninc"></i> </button></div></div></div>';

//             } else if (type === 'exp') {
//                 element = DOMstrings.expenseContainer;
//                 html = '<div class="item clearfix"  id="exp-%id%"><div class="item-description">%description%</div><div class="right"><div class="item-value exp">%value%</div><div class="item-percentage-container"><div class="item-percentage">30%</div></div><div class="item-delete"><button><i class="ion-ios-close-outline btnexp"></i> </button></div></div></div>';
//             }
//             // replace placeholder with actuall data
//             newHtml= html.replace('%id%', obj.id)
//             newHtml = newHtml.replace ('%description%', obj.description)
//             newHtml = newHtml.replace ('%value%', formatNumber(obj.value, type))

//             //insert the html into the DOM
//             document.querySelector(element).insertAdjacentHTML('beforeend', newHtml)

//         },

//         getDOMstrings: function () {
//             return DOMstrings;
//         },

//         clearFields: function () {
//             var fields, fieldval;

//             fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue)

//             fieldval = Array.prototype.slice.call(fields);
//             fieldval.forEach(function(current, index, array) {
//                 current.value=""
//             });

//             fieldval[0].focus();
//         },

//         displayBudget: function(obj) {
//             var type
//             obj.budget > 0 ? type = 'inc' : type = 'exp';

//             document.querySelector('.budget-value').textContent = formatNumber(obj.budget, type);
//             document.querySelector('.top-income-value').textContent =  formatNumber(obj.totalInc, 'inc');
//             document.querySelector('.top-expense-value').textContent = formatNumber(obj.totalExp, 'exp');
//             if (obj.percentage > 0) {
//                 document.querySelector('.top-expense-percentage').textContent = obj.percentage + '%';
//             } else {
//                 document.querySelector('.top-expense-percentage').textContent = '-';
//             }
//         },

//         displayPercentage:function(percentages) {

//             var fields = document.querySelectorAll('.item-percentage');

//             nodeListForEach(fields, function(current, index) {
//                 if (percentages[index] > 0) {

//                     current.textContent = percentages[index] + '%'
//                 }else {
//                     current.textContent = '-'
//                 }
//             })

//         },

//         deletefromui: function(selectorid) {
//             el = document.getElementById(selectorid);
//             el.parentNode.removeChild(el);
//         },

//         updatingDate: function() {
//             //update the date
//             var date, month, months;
//             date = new Date();
//             year = date.getFullYear();
//             months = ['january', 'febuary', 'march','april','may','june','july','august','september','october','november','deceber']
//             month = date.getMonth();
//             console.log(month);
//             console.log(date);

//             //display the date
//             document.querySelector('.budget-header-month').textContent = months[month]
//             + ' ' + year + ':';
//         },

//         stylingUI: function() {
//            var  fields = document.querySelectorAll(DOMstrings.inputType + ',' + DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
//            nodeListForEach(fields, function(cur) {
//                 cur.classList.toggle('red-focus')
//             });
//             document.querySelector('.ion-ios-checkmark-outline').classList.toggle('red');
//         }

//     }

// })();

// //GLOBAL APP CONTROLER

// var controller = (function (budgetCtrl, UICtrl) {

//            var   setupEventlisteners = function () {
//             var DOM = UICtrl.getDOMstrings;
//             var el = document.getElementById('bton');
//             if(el){
//             el.addEventListener("click", addItem)};

//             document.addEventListener("keypress", function(event) {
//                 if (event.keyCode === 13 || event.which === 13){
//                     addItem();
//                 }
//             });

//             document.querySelector('.row2').addEventListener('click', deleteItem);

//             document.querySelector('.options').addEventListener('change', UICtrl.stylingUI);
//         }

//         var updateBudget = function() {
//             //calculate the budget
//             budgetCtrl.calculateBudget();

//             //return the function
//             var budget = budgetCtrl.getBudget();

//             //display the budget in the UI
//             UICtrl.displayBudget(budget);
//         }

//        var updatePercentage = function() {
//             //calculate percentage
//             budgetCtrl.calperc();
//             //read percentage from budgetctrl
//             var percentages = budgetCtrl.getperc();
//             //dipslay the on the UI the new percentage
//             // document.querySelector('.item-percentage').innerHTML = percentages;
//              UICtrl.displayPercentage(percentages);
//         }

//     var addItem = function(){
//          var input, newItem;
//         //get item(type, descri, value) from UIctrl
//          input = UICtrl.getInput();

//        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
//             // add the item to the budget controller
//         newItem = budgetCtrl.addItem(input.type, input.description, input.value);

//         //add the item to the UI
//         UICtrl.addListItem(newItem, input.type);

//         //clearfields
//         UICtrl.clearFields();
//         //display the budget on the UI
//         updateBudget();

//         //calc and update percentages
//         updatePercentage();

//         // UICtrl.updatingIncomeVal(input.type);
//        }
//     }

//     var deleteItem = function(event) {
//         var itemID, splitID, type, ID;
//         itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
//         splitID = itemID.split('-');
//         type = splitID[0];
//         ID = parseInt(splitID[1]);

//         //deleteitems
//         budgetCtrl.deleteitem(type, ID);

//         //delete the item from ui
//         UICtrl.deletefromui(itemID);

//         //update and show the new budget
//         updateBudget();

//         //calc and update percentages
//         updatePercentage();

//     }

//     UICtrl.updatingDate();

//     return {
//          init: function() {
//             console.log('application ready to work');
//             setupEventlisteners();
//         }
//     }

// })(budgetController, UIController);

// controller.init();

// E.G own

const budgetController = (function () {
	//income constructor
	Income = function (id, description, value) {
		(this.id = id), (this.description = description), (this.value = value);
	};

	//expense constructor
	Expense = function (id, description, value) {
		(this.id = id), (this.description = description), (this.value = value);
		this.percentage = -1;
	};

	Expense.prototype.calPerc = function (totalInc) {
		if (totalInc > 0) {
			this.percentage = Math.round((this.value / totalInc) * 100);
		} else {
			this.percentage = -1;
		}
	};

	Expense.prototype.getPerce = function () {
		percentage = this.percentage;

		return percentage;
	};
	//data structure
	var data = {
		allItems: {
			inc: [],
			exp: [],
		},

		totals: {
			inc: 0,
			exp: 0,
		},

		budget: 0,
		percent: -1,
	};

	var calcTotal = function (type) {
		var sum = 0;
		data.allItems[type].forEach(function (cur) {
			sum = parseInt(sum) + parseInt(cur.value);
		});
		data.totals.type = sum;

		return data.totals.type;
	};

	return {
		//to add an item to either inc or exp
		addItem: function (type, des, val) {
			var ID, newItem;
			//check for last ID and adding one to it
			if (data.allItems[type].length > 0) {
				ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
			} else {
				ID = 0;
			}
			if (type === "inc") {
				newItem = new Income(ID, des, val);
			} else if (type === "exp") {
				newItem = new Expense(ID, des, val);
			}
			data.allItems[type].push(newItem);
			return newItem;
		},

		updateBudget: function () {
			//calcualte total for inconme and expenses
			data.totals.inc = calcTotal("inc");
			data.totals.exp = calcTotal("exp");

			data.budget = data.totals.inc - data.totals.exp;

			if (data.totals.inc > 0) {
				data.percent = Math.round((data.totals.exp / data.totals.inc) * 100);
			} else {
				data.percent = -1;
			}
		},

		getBudget: function () {
			return {
				budget: data.budget,
				totalInc: data.totals.inc,
				totalExp: data.totals.exp,
				percentages: data.percent,
			};
		},

		calcPerc: function () {
			data.allItems.exp.forEach(function (cur) {
				cur.calPerc(data.totals.inc);
			});
		},

		getperc: function () {
			var getPercentage = data.allItems.exp.map(function (cur) {
				return cur.getPerce();
			});
			return getPercentage;
		},

		deleteItem: function (type, id) {
			var ids, index;
			ids = data.allItems[type].map((cur) => {
				return cur.id;
			});
			let ID = parseInt(id);
			index = ids.indexOf(ID);
			if (index !== -1) {
				data.allItems[type].splice(index, 1);
			}
		},
	};
})();

//UI control
const UIController = (function () {
	var DOMstrings = {
		inputType: ".options",
		inputDescription: ".descript",
		inputValue: ".description-value",
		a: "#bton",
		incomeContainer: ".income-list",
		expenseContainer: ".expense-list",
		container: ".row2",
        month: ".budget-header-month"
	};

    const months = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"]

    document.querySelector(DOMstrings.month).innerText = months[new Date().getMonth()]

	var formatNumber = function (num, type) {
		var num = Math.abs(num);
		num = num.toFixed(2);

		var splitNum = num.split(".");

		let Int, dec;

		[Int, dec] = splitNum;

		Int = Intl.NumberFormat().format(Int);

		return (type === "exp" ? "-" : "+") + Int + "." + dec;
	};

	return {
		getInput: function () {
			return {
				type: document.querySelector(DOMstrings.inputType).value,
				description: document.querySelector(DOMstrings.inputDescription).value,
				value: document.querySelector(DOMstrings.inputValue).value,
			};
		},

		getDOMstrings: function () {
			return DOMstrings;
		},

		addListItem: function (type, obj) {
			if (type === "inc") {
				var html, newHtml;
				html = `
                <div class="item clearfix"  id="inc-%id%">
                <div class="item-description">%salary%</div>
                <div class="right">
                    <div class="item-value">%5000%</div>
                    <div class="item-delete">
                        <button class="delete"><i class="ion-ios-close-outline"></i> </button>
                    </div>
                </div>
          </div>
    
    
                `;

				newHtml = html.replace("%salary%", obj.description);
				newHtml = newHtml.replace("%id%", obj.id);
				newHtml = newHtml.replace("%5000%", formatNumber(obj.value, type));
				document
					.querySelector(".income-list")
					.insertAdjacentHTML("beforeend", newHtml);
			} else if (type === "exp") {
				var html, newHtml;
				html = `
                <div class="item clearfix"  id="exp-%id%">
                <div class="item-description">%salary%</div>
                <div class="right">
                    <div class="item-value">%5000%</div>
                    <div class="item-percentage-container">
                        <div class="item-percentage">30%</div>
                    </div>
                    <div class="item-delete">
                        <button class="delete"><i class="ion-ios-close-outline"></i> </button>
                    </div>
                </div>
            </div>

                `;

				newHtml = html.replace("%salary%", obj.description);
				newHtml = newHtml.replace("%id%", obj.id);
				newHtml = newHtml.replace("%5000%", formatNumber(obj.value, type));

				document
					.querySelector(".expense-list")
					.insertAdjacentHTML("beforeend", newHtml);
			}
		},

		clearInput: function () {
			document.querySelector(DOMstrings.inputDescription).value = "";
			document.querySelector(DOMstrings.inputValue).value = "";
		},

		disBudget: function (obj) {
			document.querySelector(".budget-value").textContent =
				Intl.NumberFormat().format(obj.budget);
			(document.querySelector(".top-income-value").textContent = formatNumber(
				obj.totalInc,
				"inc",
			)),
				(document.querySelector(".top-expense-value").textContent =
					formatNumber(obj.totalExp, "exp")),
				(document.querySelector(".top-expense-percentage").innerHTML =
					obj.percentages);
		},

		stylingUI: function () {
			var fields = document.querySelectorAll(
				DOMstrings.inputType +
					"," +
					DOMstrings.inputDescription +
					", " +
					DOMstrings.inputValue,
			);

			fieldarr = Array.from(fields);

			fieldarr.map((cur) => {
				cur.classList.toggle("red-focus");
			});

			document
				.querySelector(".ion-ios-checkmark-outline")
				.classList.toggle("red");

                document
				.querySelector(".button-holder-show")
				.classList.toggle("bg-red");
		},

		updatePerc: function (percentage) {
			var fields = document.querySelectorAll(".item-percentage");
			arr = Array.from(fields);

			arr.forEach((cur, index) => {
				if (percentage[index] > 0) {
					cur.textContent = `${percentage[index]}%`;
				} else {
					cur.textContent = "-";
				}
			});
		},

		deleteItem: function (itemID) {
			el = document.getElementById(itemID);
			el.parentNode.removeChild(el);
		},
	};
})();

//Global control
const controller = (function (budgetCtrl, UICtrl) {
	var DOM = UICtrl.getDOMstrings();

	var setupEventlisteners = function () {
		const el = document.querySelector(DOM.a);
		if (el) {
			el.addEventListener("click", addItem);
		}

        const ele = document.querySelector(".button-holder-show")
        if (ele) {
            ele.addEventListener("click", addItem);
        }

		document.addEventListener("keydown", (e) => {
			if (e.key === "Enter") {
				addItem();
			}
		});

		document
			.querySelector(".options")
			.addEventListener("change", UICtrl.stylingUI);

		document.querySelector(".row2").addEventListener("click", deleteItem);
	};

	// UICtrl.stylingUI(.type)

	const addItem = function () {
		var input, newItem;
		//get field input
		input = UICtrl.getInput();

		//add item to budget controller
		if (input.description !== " " && !isNaN(input.value) && input.value > 0) {
			newItem = budgetCtrl.addItem(input.type, input.description, input.value);
		}

		//add item to ui
		UICtrl.addListItem(input.type, newItem);

		//clear input
		UICtrl.clearInput();

		//calculate the budget
		budgetCtrl.updateBudget();

		//get budget
		budget = budgetCtrl.getBudget();
		//display the budget on the UI
		UICtrl.disBudget(budget);

		//calculate percentage
		budgetCtrl.calcPerc();

		//getPercentage
		var percentages = budgetCtrl.getperc();

		//display percentage

		UICtrl.updatePerc(percentages);
	};

	const deleteItem = (e) => {
		var itemID, splitID, ID, type;

		itemID = e.target.parentNode.parentNode.parentNode.parentNode.id;

		splitID = itemID.split("-");
		type = splitID[0];
		ID = splitID[1];

		//delete from budget
		budgetCtrl.deleteItem(type, ID);

		//delete from ui
		UICtrl.deleteItem(itemID);

		//calculate the budget
		budgetCtrl.updateBudget();

		//get budget
		budget = budgetCtrl.getBudget();
		//display the budget on the UI
		UICtrl.disBudget(budget);

		//calculate percentage
		budgetCtrl.calcPerc();

		//getPercentage
		var percentages = budgetCtrl.getperc();

		//display percentage

		UICtrl.updatePerc(percentages);
	};

	return {
		init: function () {
			console.log("application ready to work");
			setupEventlisteners();
		},
	};
})(budgetController, UIController);

controller.init();
