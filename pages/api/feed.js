import dbConnect from "../../utils/dbConnect";
import Fed from "../../models/Fed";
import validator from "validator";

export default async function handler(req, res) {
  const { method } = req;

  try {
    await dbConnect();
  }catch (error) {
    res.status(500).json({ success: false, data: error });
  }

  switch (method) {
    case "GET":
      try {
        let perPage =
          req.query.results && req.query.results <= 100
            ? parseInt(req.query.results)
            : 10;
        let page =
          req.query.page && validator.isNumeric(req.query.page)
            ? parseInt(req.query.page)
            : 0;
        /* find the data in our database */
        const feds = await Fed.find()
          .limit(perPage)
          .skip(perPage * page)
          .sort({"created_date": -1});
        res.status(200).json({ success: true, data: feds });
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;
    case "POST":
      const fed = new Fed(req.body);
      try {
        /* save the data in our database */
        await fed.save();
        console.log(`Success save new fed data: ${fed._id}`);
        return res.status(201).json({ success: true, data: fed });
      } catch (error) {
        console.error(`Error save new fed data: ${error}`);
        return res.status(400).json({ success: false, data: error });
      }
    default:
      res.status(400).json({ success: false });
      break;
  }
}
