// citizen.controller.js
import Citizen from "../models/Citizen.model.js";
import geocodeAddress from "../utils/geocoder.js";

// Register a new address
export const registerAddress = async (req, res) => {
  try {
    const { nin, country, state, city, lga, street, housenumber, datemovedin, datemovedout } = req.body;

    if (!nin || !state || !datemovedin || !datemovedout) {
      return res.status(400).json({ message: "nin, state, datemovedin and datemovedout are required" });
    }

    const citizen = await Citizen.findOne({ nin });
    if (!citizen) return res.status(404).json({ message: "Citizen not found" });

    const fullAddress = `${housenumber || ""} ${street || ""}, ${city || ""}, ${state}, ${country || ""}`;
    const geo = await geocodeAddress(fullAddress);

    citizen.History.push({
      country,
      state,
      city,
      lga,
      street,
      housenumber,
      datemovedin: new Date(datemovedin),
      datemovedout: new Date(datemovedout),
      formattedAddress: fullAddress.trim(),
      latitude: geo ? geo.latitude : null,
      longitude: geo ? geo.longitude : null,
    });

    await citizen.save();

    return res.status(200).json({ message: "Address added successfully", fullname: citizen.fullname, history: citizen.History });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get citizen address history (Route ID / Query Params example)
export const getCitizenHistory = async (req, res) => {
  try {
    // Route ID example
    const { nin } = req.params; 

    // Query Params example
    const { state } = req.query; 

    const citizen = await Citizen.findOne({ nin });
    if (!citizen) return res.status(404).json({ message: "Citizen not found" });

    let history = citizen.History;

    // Filter by query param 
    if (state) {
      history = history.filter(h => h.state.toLowerCase() === state.toLowerCase());
    }

    return res.status(200).json({ message: "Address history retrieved", fullname: citizen.fullname, history });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get citizen by slug 
export const getCitizenBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const [nin] = slug.split("-"); 

    const citizen = await Citizen.findOne({ nin });
    if (!citizen) return res.status(404).json({ message: "Citizen not found" });

    return res.status(200).json({ message: "Citizen retrieved", fullname: citizen.fullname, history: citizen.History });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
