import Calculations from '../services/calculator.js';
import Helper from '../services/helper.js';
import { Tags, DueDate } from '../config/globals.js';

export default {
	getFutureAmountPeriodicInvestment: function (returnAmount, amountRequired, durationYears, durationMonths, frequency) {
		let _futureAmountRequired = Helper.getNumber(amountRequired);
		let _durYears = Helper.getNumber(durationYears);
		let _durMonths = Helper.getNumber(durationMonths);
		let _frequencySelection = frequency;
		let _frequency = 0;
		let _duration = 0;
		switch (_frequencySelection)
		{
			case Tags.frequencyAnnual:
				_frequency = 1;
				_duration = _durYears + (_durMonths / 12);
				break;
			case Tags.frequencyQuarterly:
				_frequency = 4;
				_duration = (_durYears * 4) + (_durMonths / 3);
				break;
			case Tags.frequencyMonthly:
				_frequency = 12;
				_duration = (_durYears * 12) + _durMonths;
				break;
			default:
				_frequency = 0;
				_duration = 0;
				break;
		}
		let rate = Math.pow((1.0 + (returnAmount / 100)), (1.0 / _frequency)) - 1;
		let duration = _duration;
		let finalValue = Calculations.calculatePayment(rate, duration, 0, -_futureAmountRequired, DueDate.BegOfPeriod);
		return Helper.getReturnValue(finalValue);
	},
	getFutureAmountLumpSumInvestment: function (returnAmount, amountRequired, durationYears, durationMonths) {
		let _futureAmountRequired = Helper.getNumber(amountRequired);
		let _durYears = Helper.getNumber(durationYears);
		let _durMonths = Helper.getNumber(durationMonths);
		let calculatedReturnPercentage = Helper.getNumber(returnAmount / 100);
		let calculatedTime = _durYears + (_durMonths / 12);
		let finalValue = _futureAmountRequired / Math.pow((1 + calculatedReturnPercentage), calculatedTime);
		return Helper.getReturnValue(finalValue);
	},
	getFutureAmountPeriodicLumpSumInvestment: function(returnAmount, amountRequired, amountToday, durationYears, durationMonths, frequency) {
		let _futureAmountRequired = Helper.getNumber(amountRequired);
		let _amountToday = Helper.getNumber(amountToday);
		let _durYears = Helper.getNumber(durationYears);
		let _durMonths = Helper.getNumber(durationMonths);
		let _frequencySelection = frequency;
		let _frequency = 0;
		let _duration = 0;
		switch (_frequencySelection)
		{
			case Tags.frequencyAnnual:
				_frequency = 1;
				_duration = _durYears + (_durMonths / 12);
				break;
			case Tags.frequencyQuarterly:
				_frequency = 4;
				_duration = (_durYears * 4) + (_durMonths / 3);
				break;
			case Tags.frequencyMonthly:
				_frequency = 12;
				_duration = (_durYears * 12) + _durMonths;
				break;
			default:
				_frequency = 0;
				_duration = 0;
				break;
		}
		let finalValue = Calculations.calculatePayment(Math.pow((1.0 + (returnAmount / 100.0)), (1.0 / _frequency)) - 1, _duration, _amountToday, -_futureAmountRequired, DueDate.BegOfPeriod);
		return Helper.getReturnValue(finalValue);
	},
	getFutureAmountLeveragedRequiredLumpSumLeveraged: function(requiredAmount, durationYears, annualCompoundReturn) {
		let _amountRequired = Helper.getNumber(requiredAmount);
		let _durYears = Helper.getNumber(durationYears);
		let _annualCompoundReturn = Helper.getNumber(annualCompoundReturn);
		let finalValue = NaN;
		if (_durYears > 0 && _annualCompoundReturn > 0) {
			finalValue = _amountRequired / (Math.pow(1 + (_annualCompoundReturn / 100.00), _durYears) - 1);
		}
		return Helper.getReturnValue(finalValue);
	},
	getFutureAmountLeveragedValueAmount: function(requiredAmount, durationYears, annualCompoundReturn) {
		let _amountRequired = Helper.getNumber(requiredAmount);
		let _durYears = Helper.getNumber(durationYears);
		let _annualCompoundReturn = Helper.getNumber(annualCompoundReturn);
		let finalValue = NaN;
		if (_durYears > 0 && _annualCompoundReturn > 0) {
			let requiredLumpSumValue = _amountRequired / (Math.pow(1 + (_annualCompoundReturn / 100.00), _durYears) - 1);
			finalValue = requiredLumpSumValue * (Math.pow((1 + (_annualCompoundReturn / 100.00)), _durYears));
		}
		return Helper.getReturnValue(finalValue);
	},
	getFutureAmountLeveragedValueBalanceAfterLoan: function(requiredAmount, durationYears, annualCompoundReturn) {
		let _amountRequired = Helper.getNumber(requiredAmount);
		let _durYears = Helper.getNumber(durationYears);
		let _annualCompoundReturn = Helper.getNumber(annualCompoundReturn);
		let finalValue = NaN;
		if (_durYears > 0 && _annualCompoundReturn > 0) {
			let requiredLumpSumValue = _amountRequired / (Math.pow(1 + (_annualCompoundReturn / 100.00), _durYears) - 1);
			let leveragedAmountValue = requiredLumpSumValue * (Math.pow((1 + (_annualCompoundReturn / 100.00)), _durYears));
			finalValue = leveragedAmountValue - requiredLumpSumValue;
		}
		return Helper.getReturnValue(finalValue);
	}
}