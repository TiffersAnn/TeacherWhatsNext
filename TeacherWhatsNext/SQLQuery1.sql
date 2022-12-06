Select u.Id, u.FirstName, u.LastName, u.DisplayName, u.UserTypeId,
                            ut.Id, ut.Name
                            From UserProfile u
                                Left Join UserType ut ON u.UserTypeId = ut.Id