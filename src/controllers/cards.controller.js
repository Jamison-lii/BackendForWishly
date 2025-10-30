import Card from "../models/cards.model.js";

export async function createCard(req, res) {
  try {
    console.log("🧾 BODY RECEIVED:", req.body);
    console.log("📂 FILES RECEIVED:", req.files);

    let messages = [];

    // Safely parse messages
    if (req.body.messages) {
      try {
        messages = JSON.parse(req.body.messages);
      } catch (parseErr) {
        console.error("❌ JSON parse error:", parseErr);
        messages = [req.body.messages];
      }
    }

    const images = (req.files?.images || []).map((file) => file.path);
    const song = req.files?.song?.[0]?.path || null;

    console.log("✅ Parsed name:", req.body.name);
    console.log("✅ Parsed messages:", messages);
    console.log("✅ Parsed images:", images);
    console.log("✅ Parsed song:", song);

    const card = new Card({
      name: req.body.name,
      messages,
      images,
      song,
    });

    await card.save();
    console.log("🎉 Card successfully saved:", card);

    res.status(201).json({ success: true, card });
  } catch (err) {
    console.error("❌ FULL SERVER ERROR DETAILS:");
    console.error(err.stack || err);
    res
      .status(500)
      .json({ success: false, error: err.message || "Unknown server error" });
  }
}


export async function getCard(req, res) {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) return res.status(404).json({ success: false, error: "Not found" });
    res.json({ success: true, card });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
}
