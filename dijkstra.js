let vertices = [];
let adjacencyList = {};

function addVertex(vertex) {
  vertices.push(vertex);
  adjacencyList[vertex] = {};
}

function addEdge(vertex1, vertex2, weight) {
  adjacencyList[vertex1][vertex2] = weight;
}

function dijkstra(source) {
  let distances = {},
    parents = {},
    visited = new Set();

  for (let i = 0; i < vertices.length; i++) {
    if (vertices[i] === source) {
      distances[source] = 0;
    } else {
      distances[vertices[i]] = Infinity;
    }
    parents[vertices[i]] = null;
  }

  let currVertex = vertexDistanceMin(distances, visited);

  while (currVertex !== null) {
    let distance = distances[currVertex],
      neighbors = adjacencyList[currVertex];
    for (let neighbor in neighbors) {
      let newDistance = distance + neighbors[neighbor]; //5
      if (distances[neighbor] > newDistance) {
        distances[neighbor] = newDistance;
        parents[neighbor] = currVertex;
      }
    }
    visited.add(currVertex);
    currVertex = vertexDistanceMin(distances, visited);
  }

  console.log(parents);
  console.log(distances);
}

function vertexDistanceMin(distances, visited) {
  let minDistance = Infinity,
    minVertex = null;
  for (let vertex in distances) {
    let distance = distances[vertex];
    if (distance < minDistance && !visited.has(vertex)) {
      minDistance = distance;
      minVertex = vertex;
    }
  }
  return minVertex;
}

addVertex("A");
addVertex("B");
addVertex("C");
addVertex("D");

addEdge("A", "B", 3);
addEdge("A", "C", 2);
addEdge("B", "D", 2);
addEdge("C", "D", 6);

dijkstra("A");
