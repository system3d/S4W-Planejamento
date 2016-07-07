'use strict'

let protractorMatchers = require('jasmine-protractor-matchers');

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {

	beforeEach(function() {
		jasmine.addMatchers(protractorMatchers);
	})

	it('should automatically redirect to /#/cronograma when location hash/fragment is empty', function() {
		browser.get('/');
		expect(browser.getLocationAbsUrl()).toMatch("/cronograma");
	});

	describe("Cronogramas Tab", function() {

		beforeAll(function() {
			browser.waitForAngular();
		});

		it('should render cronogramas view', function() {
			expect($('div.box-crono')).toAppear(1000);
		});

		it('Should populate table', function() {
			expect(element.all(by.repeater('cr in crono.Cronogramas')).count()).toEqual(4);
		})

		it('Button Should Be Desabled', () => {
			let submit = element(by.css('.btn-success.pull-right'));
			expect(submit.isEnabled()).toBe(false);
		})

		it('Should Click in an obra then show etapas input', () => {
			element(by.cssContainingText('option', 'TransVilmar')).click()
			let etapasSelect = element(by.css('[ng-show="main.Etapas"]'))
			expect(etapasSelect).toAppear(1000)

		})

		it('Should Filter the Cronos by Obra', () => {
			element(by.css('[ng-click="main.load()"]')).click()
			expect(element.all(by.repeater('cr in crono.Cronogramas')).count()).toEqual(2);
			element.all(by.css('tr.ng-scope')).then(function(elements) {
				expect(elements.length).toEqual(2)
			});
		})

		it('Should Filter the Cronos by Etapa', () => {
			element(by.cssContainingText('option', 'T1')).click()
			element(by.css('[ng-click="main.load()"]')).click()
			expect(element.all(by.repeater('cr in crono.Cronogramas')).count()).toEqual(1);
			element.all(by.css('tr.ng-scope')).then(function(elements) {
				expect(elements.length).toEqual(1)
			});
		})

		it('Should Open Datepicker', () => {
			element(by.css('.bd-datepicker.planejamento-input')).click()
				.then(() => {
					expect($('div.datepicker-dropdown')).toAppear(250);
				})
		})

		it('Should Pick a day(today), thus enabling the save button, then revert it', () => {
			browser.driver.sleep(200);
			element(by.css('.new.today.day')).click()
			let submit = element(by.css('.btn-success.pull-right'))
			let reset = element(by.css('[ng-click="crono.resetCrono()"]'))
			expect(submit.isEnabled()).toBeTruthy()
			expect(reset.isEnabled()).toBeTruthy()
			reset.click()
			browser.driver.sleep(200);
			expect(reset.isEnabled()).toBeFalsy()
			expect(submit.isEnabled()).toBeFalsy()
			expect(element.all(by.repeater('cr in crono.Cronogramas')).count()).toEqual(1);
		})

		it('Should Save the cronos', () => {
			let submit = element(by.css('.btn-success.pull-right'))
			element(by.css('.bd-datepicker.planejamento-input')).click()
			element(by.css('.new.today.day')).click()
			expect(element(by.css('tr.touched'))).toAppear(250)
			submit.click()
			expect(element(by.css('.sweet-alert'))).toAppear(250)
			browser.driver.sleep(400);
			element(by.css('button.confirm')).click()
			browser.driver.sleep(400);
			element(by.css('button.confirm')).click()
			browser.driver.sleep(400);
			expect(element(by.css('.sa-icon.sa-success')).getAttribute('style')).toEqual('display: block;')
		})

		it('Should Return a revision', () => {
			browser.driver.sleep(750);
			let returnBtn = element(by.css('td[ng-click="crono.voltarRevisao(cr.etapa_id)"]'))
			returnBtn.click()
			expect(element(by.css('.sweet-alert'))).toAppear(250)
			browser.driver.sleep(250);
			element(by.css('button.confirm')).click()
			browser.driver.sleep(250);
			expect(element(by.css('.sa-icon.sa-success')).getAttribute('style')).toEqual('display: block;')
			element(by.css('button.confirm')).click()
		})

		describe("Gantt Tab", () => {

			it('Should Go to Gantt Page', () => {
				browser.driver.sleep(400);
				element(by.css('a[ui-sref="gantt"]')).click()
				expect(browser.getLocationAbsUrl()).toMatch("/gantt");
				element.all(by.css('.gantt-group .btn-primary')).then(function(elements) {
					expect(elements.length).toEqual(3)
				});
				element.all(by.css('.gantt-group .btn-success')).then(function(elements) {
					expect(elements.length).toEqual(1)
				});
			})

			it('Should Show Save Button', () => {
				element(by.css('.gantt_tree_icon.gantt_open')).click()
				browser.driver.sleep(100);
				let target = element(by.css('.gantt_task_row[task_id="T699"] .gantt_task_cell'))
				let elem = element(by.css('.gantt_task_line[task_id="T699"]'))
				browser.driver.actions().dragAndDrop(elem, target).mouseUp().perform();
				browser.driver.sleep(200);
				expect($('.gantt-group .btn-success')).toAppear(200);
			})

			it('Should Save', () => {
				browser.driver.sleep(200);
				$('.gantt-group .btn-success').click()
				browser.driver.sleep(200);
				expect(element(by.css('.sweet-alert'))).toAppear(250)
				browser.driver.sleep(400);
				element(by.css('button.confirm')).click()
				browser.driver.sleep(400);
				expect(element(by.css('.sa-icon.sa-success')).getAttribute('style')).toEqual('display: block;')
				element(by.css('button.confirm')).click()
				browser.driver.sleep(400);
			})

		})

		describe("Avanço Tab", () => {
			it('Should Go to Avanço Page', () => {
				element(by.css('a[ui-sref="avanco"]')).click()
				expect(browser.getLocationAbsUrl()).toMatch("/avanco");
				expect($('.highcharts-container')).toAppear(350)
				element.all(by.css('.navbar-form .form-group')).then(function(elements) {
					expect(elements.length).toEqual(6)
				});
			})
		})

		describe("Entrega Tab", () => {
			it('Should Go to Entrega Page', () => {
				element(by.css('a[ui-sref="entrega"]')).click()
				expect(browser.getLocationAbsUrl()).toMatch("/entrega");
				expect($('.highcharts-container')).toAppear(350)
				element.all(by.css('.navbar-form .form-group')).then(function(elements) {
					expect(elements.length).toEqual(6)
				});
			})
		})

	})


});
