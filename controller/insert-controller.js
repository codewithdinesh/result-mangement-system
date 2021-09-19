//database import
var db = require('../database');

const { json } = require('express/lib/response');



module.exports = {

    homePage: function (req, res) {

        res.render('search')

    },

    //render addUser page
    addUserPage: function (req, res) {
        res.render('add-user')
    },

    addUser: function (req, res) {
        //checking input
        if (`${req.body.s6_title}` == '') {

            var userdata = {
                "name": `${req.body.name}`,
                "id": `${req.body.id}`,
                "seat": `${req.body.seat_no}`,
                "exam": `${req.body.examination}`,
                "date": `${req.body.date}`,
                "subject": [
                    {
                        "name": `${req.body.s1_title}`,
                        "marks": `${req.body.s1_marks}`,
                        "maxmarks": 100
                    },
                    {
                        "name": `${req.body.s2_title}`,
                        "marks": `${req.body.s2_marks}`,
                        "maxmarks": 100
                    },
                    {
                        "name": `${req.body.s3_title}`,
                        "marks": `${req.body.s3_marks}`,
                        "maxmarks": 100
                    },
                    {
                        "name": `${req.body.s4_title}`,
                        "marks": `${req.body.s4_marks}`,
                        "maxmarks": 100
                    },
                    {
                        "name": `${req.body.s5_title}`,
                        "marks": `${req.body.s5_marks}`,
                        "maxmarks": 100
                    }
                ],
                "sem": `${req.body.semister}`,
                "course": `${req.body.course}`
            }
        }
        else {
            var userdata = {
                "name": `${req.body.name}`,
                "id": `${req.body.id}`,
                "seat": `${req.body.seat_no}`,
                "exam": `${req.body.examination}`,
                "date": `${req.body.date}`,
                "subject": [
                    {
                        "name": `${req.body.s1_title}`,
                        "marks": `${req.body.s1_marks}`,
                        "maxmarks": 100
                    },
                    {
                        "name": `${req.body.s2_title}`,
                        "marks": `${req.body.s2_marks}`,
                        "maxmarks": 100
                    },
                    {
                        "name": `${req.body.s3_title}`,
                        "marks": `${req.body.s3_marks}`,
                        "maxmarks": 100
                    },
                    {
                        "name": `${req.body.s4_title}`,
                        "marks": `${req.body.s4_marks}`,
                        "maxmarks": 100
                    },
                    {
                        "name": `${req.body.s5_title}`,
                        "marks": `${req.body.s5_marks}`,
                        "maxmarks": 100
                    },
                    {
                        "name": `${req.body.s6_title}`,
                        "marks": `${req.body.s6_marks}`,
                        "maxmarks": 100
                    }
                ],
                "sem": `${req.body.semister}`,
                "course": `${req.body.course}`
            }
        }



        db.collection('users').insertOne(userdata, function (err, result) {
            if (err) {
                console.log("Error While Adding the data");

                return ('Error');
            }


            else {
                res.render('success')
                console.log("User Data Added")
            }


        });

    },

    //get marksheet function
    getData: function (req, res) {
        var search_term = req.query.id;
        if (search_term.length < 10) {
            res.render('err1')
        } else {

            var mySearch = {
                'id': search_term
            }
            console.log(req.query.id)
            //Find One for ONly one result
            db.collection('users').findOne(mySearch, (err, result) => {
                if (err) {
                    return err;
                }
                if (result.length < 1) {
                    res.render('err2')

                }
                else {
                    // res.send(result)

                    console.log(result.subject[0].name)
                    res.render('marksheet', { user: result })
                }

            })

        }
    }
}


