import Student from "../models/studentSchema.js";

const home = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const searchText = req.query.search || "";

    try {
        const query = searchText
            ? { name: { $regex: searchText, $options: "i" } }
            : {};

        const totalStudents = await Student.countDocuments(query);
        const totalPages = Math.ceil(totalStudents / limit);

        const records = await Student.find(query)
            .skip((page - 1) * limit)
            .limit(limit);

        res.render("index", {
            records,
            currentPage: page,
            totalPages,
            searchText
        });
    } catch (error) {
        console.log(error.message);
    }
};


const student_new_record = (req, res) => {
    try {
        res.render("student_new_record");
    } catch (error) {
        console.log(error.message);
    }
};

const add_new_record = async (req, res) => {
    try {
        console.log(req.body); // DEBUG

        const record = new Student({
            name: req.body.name,
            email: req.body.email,
            city: req.body.city,
            contact: req.body.contact,
        });

        await record.save();
        console.log("New Record Added!");

        res.redirect("/");
    } catch (error) {
        console.log(error.message);
        res.redirect("/new_record");
    }
};

//edit student record GET
const edit_student_record = async(req,res)=>{
    try{
      const record = await Student.findById(req.params.id);
      console.log(record)
      res.render('update_record',{record})
    }
    catch(error)
    {
        console.log(error.message)

    }
}

const update_record = async(req,res)=>{
    try{
        await Student.findByIdAndUpdate(req.params.id,req.body,{'new':true})
        res.redirect('/')

    }
    catch(error){
        console.log(error.message)
    }
}

const delete_student = async(req,res)=>{
  await Student.findByIdAndDelete(req.params.id)
  res.redirect('/')
}


const search_student = async (req, res) => {
    try {
        const searchText = req.body.search;

        const students = await Student.find({
            name: { $regex: searchText, $options: "i" }
        });

        res.render("result", {
            students,
            searchQuery: searchText,
            searchText     // ✅ send to header
        });
    } catch (error) {
        console.log(error.message);
    }
};


export { home, student_new_record, add_new_record,edit_student_record ,update_record,delete_student,search_student};
