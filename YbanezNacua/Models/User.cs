//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace YbanezNacua.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class User
    {
        public string username { get; set; }
        public string password { get; set; }
        public string emailaddress { get; set; }
        public string contactno { get; set; }
        public Nullable<System.DateTime> registration_date { get; set; }
        public Nullable<int> status { get; set; }
        public Nullable<int> isActivate { get; set; }
        public string generatedCode { get; set; }
    }
}
