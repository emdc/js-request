import Requester from '@emdc/requester';


const perfElement = document.getElementById('perf');
const respElement = document.getElementById('response');
const requester = new Requester('https://jsonplaceholder.typicode.com');

requester.checkPerformance = true;
requester.checkPerformanceCallback = (time, params) => {
  perfElement.innerHTML = `Response time: ${time}.<br />Parameters: ${JSON.stringify(params)}`;
};

requester.get('/todos/1').then((result) => {
  respElement.innerHTML = JSON.stringify(result, null, 2);
});
