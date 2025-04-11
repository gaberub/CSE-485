File 1: firebaseConfig.js 
//This is a portion of code that we are able to show without violating NDAs.
const remoteConfig = getRemoteConfig(app);
remoteConfig.settings = {
    minimumFetchIntervalMillis: 360000,
    fetchTimeoutMillis: 60000,
  };
  

  File 2: ExpandedPropGoogleMap.js
  //This is a portion of code that we are able to show without violating NDAs.
  useEffect(() => {
    const fetchRemoteConfigAndCheckUser = async () => {
      try {
        await fetchAndActivate(remoteConfig);
        const remoteConfigMap = getValue(remoteConfig, "expandedPropGoogleMap").asBoolean();
        setRemoteConfigMap(remoteConfigMap);

        //Grabs the users in order to check email associated with session, and sets up a list of emails that bypass the remoteConfig check
        const user = auth.currentUser;
        const bypassList = ['share@quotekong.com'];
        if ((user?.email?.endsWith("quotekong.com")) && !(user?.email && bypassList.includes(user.email))) {
          setLoadMap(remoteConfigMap);
        } 
        else {
          setLoadMap(true);
        }
      } catch (error) {
        console.error("Error fetching remote config:", error);
      }
    };

    fetchRemoteConfigAndCheckUser();
  }, []);

  function handleRemoteConfigMap() {
    if(loadMap) {
      return (
        <APIProvider
          apiKey={"xxxxxxxxxxxxxxxxxxxxxxxxxxxx"}
          libraries={["marker"]}
        >
          <Map
            mapId={"xx-xxx"}
            style={{
              width: "240px",
              height: "100%",
              maxWidth: "340px",
              borderRadius: "10px",
            }}
            defaultZoom={15}
            defaultCenter={mapLocation}
            gestureHandling={"greedy"}
            disableDefaultUI={false}
          >
            <AdvancedMarker position={mapLocation} />
          </Map>
        </APIProvider>
      );
    } 
    else {
        return <p>Map disabled for devs via firebase</p>;
    }
  }


  File 3: Button.js
  useEffect(() => {
    const fetchRemoteConfigButton = async () => {
      try {
        await fetchAndActivate(remoteConfig);
        const remoteConfigButton = getValue(remoteConfig, "EstimateLinesDetailsButtonVisible").asBoolean();
        setRemoteConfigButton(remoteConfigButton);
      } catch (error) {
        console.error("Error fetching button status:", error);
      }
    };
    fetchRemoteConfigButton();
  }, []);