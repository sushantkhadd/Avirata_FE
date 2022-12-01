export class SignupStepper{
        public aadharNo:any;
        public district:string='Select';
        public taluka: string='Select';
        public trainer: string='Select';
        public talukaJson:any;
        public coordinatorJson:any;
        public trainerModel: any;
        public schoolModel: any;
        public schoolIndexNo: any;
        public schoolName: string;
        public fullName: any;
        public emailId: any;
        public mobileNo: any;
        public date: string;
        public gender: string;
        public address:string;
        public userType:string;
        public designation: any;
        public dateofJoin: any;
        public subject: any;
        public grade: any;
        public model: any;
        public dojJson=[1977,1978,1979,1980,1981,1982,1983,1984,1985,1986,1987,1988,1989,1990,1991,1992,1993,1994,1995,1996,1997,
        1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017];

        public professionalSpecialization:string="";
        public underGraduate:string="";
        public otherUgSpecial:string="";
        public ugSpecialisation:string="";selectSchoolBy;
        public postGraduate:string="";
        public otherPgSpecial:string="";
        public pgSpecialisation:string="";
        public professional:string="";
        public othersQualification:string="";
        public bankName:string;
        public IFSCCode:any;
        public accountNo:number;
        public districtJson;
        public dropdownListSubject = [
                              {"id":1,"itemName":"Civics"},
                              {"id":2,"itemName":"English"},
                              {"id":3,"itemName":"Gujrathi"},
                              {"id":4,"itemName":"Geography"},
                              {"id":5,"itemName":"Hindi"},
                              {"id":6,"itemName":"History"},
                              {"id":7,"itemName":"ICT"},
                              {"id":8,"itemName":"Kannada"},
                              {"id":9,"itemName":"Marathi"},
                              {"id":10,"itemName":"Mathematics"},
                              {"id":11,"itemName":"Other"},
                              {"id":12,"itemName":"Physical Education"},
                              {"id":13,"itemName":"Sanskrit"},
                              {"id":14,"itemName":"Sindhi"},
                              {"id":15,"itemName":"Science"},
                              {"id":16,"itemName":"Self Defence"},
                              {"id":17,"itemName":"Self Development and Art Appreciation"},
                              {"id":18,"itemName":"Telagu"},
                              {"id":19,"itemName":"Urdu"},                             
                            ];       
}