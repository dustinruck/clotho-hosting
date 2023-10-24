function calculateUsersByDate(usersList) {

    const todayYear = new Date().getFullYear() - 2000; // 2023 - 2000 = 23
    const todayMonth = new Date().getMonth() + 1;
    const todayDate = new Date().getDate();

    // first day of data collection
    const firstDate = 9; // 9th
    const firstMonth = 10; // October
    const firstYear = 23; // 2023

    let ubdArray = []; // contains objects like { label: "2023-10-09", ubd: 0 }
    let totalUsers = 0; 
    let totalAdmins = 0;
    let totalNonAdmins = 0;

    const mapDateToIndex = new Map();
    let indexTracker = 0;

    let startYear = firstYear;
    let startMonth = firstMonth;
    let startDate = firstDate;

    setupLoop:
    for (let year = startYear; year <= todayYear; year++) {

        for (let month = startMonth; month <= 12; month++) {

            for (let date = startDate; date <= 31; date++) {

                let dateString = year.toString() + "-" + ("0" + month.toString()).slice(-2) + "-" + ("0" + date.toString()).slice(-2);
                
                // indexTracker keeps track of which array item corresponds to which date
                mapDateToIndex.set(dateString, indexTracker);
                indexTracker++;
                ubdArray.push({ label: dateString, userCount: 0 , adminCount: 0, nonAdminCount: 0});

                //OLD
                //labelsByDate.push((todayYear === firstYear) ? `${month}-${date}` : `${year}-${month}-${date}`)
                //usersByDate.push(Math.floor((Math.random() * 40)));
                if (year === todayYear && month === todayMonth && date === todayDate) {
                    break setupLoop;
                }
            }

            startDate = 1;
        }

        startMonth = 1;
    }

    usersList.map((val) => {

        let userYear = val.createdAt.slice(2, 4);
        let userMonth = val.createdAt.slice(5, 7);
        let userDate = val.createdAt.slice(8, 10);
        let userIsAdmin = val.isAdmin;

        // format date to always contain leading zeros on month and date
        let dateString = userYear + "-" + ("0" + userMonth.toString()).slice(-2) + "-" + ("0" + userDate.toString()).slice(-2);
        
        // increment totalUsers
        totalUsers++;

        // increment userCount in the object located in ubdArray at the index corresponding to the date
        ubdArray[mapDateToIndex.get(dateString)].userCount++;
        
        if (userIsAdmin) {
            totalAdmins++;
            ubdArray[mapDateToIndex.get(dateString)].adminCount++;

        } else {
            totalNonAdmins++;
            ubdArray[mapDateToIndex.get(dateString)].nonAdminCount++;
        }

    })

    return { ubdArray, totalUsers, totalAdmins, totalNonAdmins};
}

export default calculateUsersByDate;