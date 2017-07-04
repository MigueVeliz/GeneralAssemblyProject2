$(() => {

        console.log('jQuery Connected!');


        const createFilters = () => {
                const borough = $('#borough option:selected').text();
                const offense = $('#offense option:selected').text();
                const location = $('#location option:selected').text();
                //const jurisdiction = $('#jurisdiction option:selected').text();

                getCrimes(borough, offense, location);

            } //end createFilters

        //when search form is submitted
        $('#search').on('submit', (e) => {
            e.preventDefault();
            const crime = $('#search-input').val();
            //console.log("search form was submitted with val: " + crime);
            //getCrimes(crime);
            createFilters();
        })

        const getCrimes = (borough, offense, location) => {
                $.ajax({
                    //url: `https://data.cityofnewyork.us/resource/9s4h-37hy.json?&boro_nm=${borough}&ofns_desc=${offense}&loc_of_occur_desc=${location}&juris_desc=${jurisdiction}`,
                    url: `https://data.cityofnewyork.us/resource/9s4h-37hy.json?loc_of_occur_desc=${location}&boro_nm=${borough}&ofns_desc=${offense}`,
                    type: 'GET',
                    success: (data) => {
                        console.log("Hey from ajax getCrimes");
                        console.log(data.length);

                        //parseCrimes(data);
                        renderCrimes(data);
                    },
                    error: (err) => {
                        console.log("ajax error: " + err)
                    }

                }); //end of ajax

            } //end of sendParameters


        // parse and validate your data. This data may end
        // up in your database so you want to keep it consistent.
        // look at the `seed` file to figure out what values you need
        // what if a result doesn't have an image? a network? a summary?

        const parseCrimes = (crimes) => {
            console.log(crimes)

            const parsedCrimes = crimes.reduce((crimes, crime) => {
                if (crime.crime) { //ir errror, try crime.data
                    crimes.push({
                        caseNumber: crime.crime.cmplnt_num,
                        borough: crime.crime.boro_name,
                        offense: crime.crime.ofns_desc,
                        location: crime.crime.loc_of_occur_desc
                    })
                    console.lo(crimes);
                    console.log(crime);
                    console.log(parsedCrimes);

                }
                return crimes
            }, []);
            renderCrimes(parsedCrimes);
        }

        // render your data! Each result should have:
        // name, image, summary, network, and a button that will call
        // createShow()
        const renderCrimes = (crimes) => {
            const $results = $('.results').empty();

            crimes.forEach(crime => {
                console.log(crime.boro_nm);

                const crimesContainer = $('<div>', { class: 'crime-container' });
                const singleCrime = $('<div>', { class: 'single-crime' });

                const complaintNum = $('<p>').text('Case Number #: ' + crime.cmplnt_num).appendTo(singleCrime);
                const boroData = $('<p>').text('Borough: ' + crime.boro_nm).appendTo(singleCrime);
                const offenseData = $('<p>').text('Offense: ' + crime.ofns_desc).appendTo(singleCrime);
                const location = $('<p>').text('Location: ' + crime.loc_of_occur_desc).appendTo(singleCrime);
                const jurisdiction = $('<p>').text('Jurisdiction: ' + crime.juris_desc).appendTo(singleCrime);

                const saveButton = $('<button>', {
                    id: 'save-show'
                }).text('Save Crime').appendTo(singleCrime).click(e => {

                    const crimeData = {
                        //this is the var names used in the model
                        case_number: crime.cmplnt_num,
                        offense: crime.ofns_desc,
                        place_of_occurrance: crime.loc_of_occur_desc,
                        borough: crime.boro_nm
                    };

                    createCrime(crimeData);

                    console.log(crimeData);


                })

                singleCrime.appendTo(crimesContainer);
                crimesContainer.appendTo($results);
            });

        }


        // this function should preform an ajax call to your post route
        // to add the crime to your database
        const createCrime = (crime) => {
            $.ajax({
                url: '/crimes/',
                type: 'POST',
                data: crime,
                success: res => {
                    window.location.replace(`/crimes/${res.crime.id}`);

                    console.log("Ajax cretaeCrime: ", res.crime.id)
                        //window.location.replace(`/shows/${res.crime.id}`);
                },
                error: err => {
                    console.log(err);
                }
            })
        }

        //button in edit page
        $('#edit-show').on('submit', (e) => {


            e.preventDefault();

            console.log("clicked edit button")

            const crime = {
                case_number: $('#case-number-input').val(), 
                offense: $('#offense-input').val(),
                place_of_occurrance: $('#location-input').val(),
                borough: $('#borough-input').val(),
                id: $('#id-input').val()
            }

            console.log("crime obj once submit is clicked", crime);

            editCrime(crime);

        });


        // updates information the user
        // wants to change
        const editCrime = ( crime ) => {
          $.ajax({ 
            url: `/crimes/${crime.id}`,
            type: 'PUT',
            data: crime,
            success: res => {
              console.log(res);
              window.location.replace(`/crimes/${crime.id}`);
            },
            error: err => { console.log( err ) }

          })
        }//end of editCrime


        $('#delete-crime').click(e => {
          deleteCrime($(e.target).attr('data-id'))
        })

        const deleteCrime = (id) =>{
          $.ajax({
            url: `/crimes/${id}`,
            type: 'DELETE',
            success: res => {
              console.log(res);
              window.location.replace('/crimes/');
            },
            error: err => { console.log(err) }
          })
        }









    }) //end of document.ready
