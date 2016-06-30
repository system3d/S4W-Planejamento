export default class EntregaController {
  constructor() {
		this.labels = ["Projeto", "Fabricação", "Expedição", "Montagem"];
		this.series = ['Previsto', 'Realizado'];
		this.data = [
			[28, 86, 27, 90],
			[65, 59, 80, 81]
		];

		this.colors =  ['#00ADF9', '#12A030', '#C359FA', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360']
	}
}
