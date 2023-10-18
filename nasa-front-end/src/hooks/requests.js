async function httpGetPlanets() {
  const planets = await fetch(`${process.env.REACT_APP_HOST}/planets`);
  const data = await planets.json();
  return data;
  // TODO: Once API is ready.
  // Load planets and return as JSON.
}

async function httpGetLaunches() {
  const launches = await fetch(`${process.env.REACT_APP_HOST}/launches`);
  const data = await launches.json();
  return data.sort((first, second) => {
    return first - second;
  });
  // Load launches, sort by flight number, and return as JSON.
}

async function httpSubmitLaunch(launch) {
  // TODO: Once API is ready.
  try {
    const response = await fetch(`${process.env.REACT_APP_HOST}/launches`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(launch),
    });
    const data = await response.json();
    if (response.status === 400) {
      throw new Error("400");
    } else {
      return response;
    }
  } catch (error) {
    return { ok: false };
  }

  // Submit given launch data to launch system.
}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  try {
    const response = await fetch(
      `${process.env.REACT_APP_HOST}/launches/${id}`,
      {
        method: "Delete",
      }
    );
    return response;
  } catch (err) {
    console.log(err);
    return { ok: false };
  }
  // Delete launch with given ID.
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
