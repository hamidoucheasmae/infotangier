/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// THIS CODE IS GENERATED - DO NOT MODIFY.
const u = undefined;
function plural(val) {
    const n = val, i = Math.floor(Math.abs(val)), v = val.toString().replace(/^[^.]*\.?/, '').length, e = parseInt(val.toString().replace(/^[^e]*(e([-+]?\d+))?/, '$2')) || 0;
    if (i === 0 || i === 1)
        return 1;
    if (e === 0 && (!(i === 0) && (i % 1000000 === 0 && v === 0)) || !(e >= 0 && e <= 5))
        return 4;
    return 5;
}
export default ["fr-CA", [["a", "p"], ["a.m.", "p.m."], u], [["a.m.", "p.m."], u, u], [["D", "L", "M", "M", "J", "V", "S"], ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."], ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"], ["di", "lu", "ma", "me", "je", "ve", "sa"]], u, [["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juill.", "août", "sept.", "oct.", "nov.", "déc."], ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"]], u, [["av. J.-C.", "ap. J.-C."], u, ["avant Jésus-Christ", "après Jésus-Christ"]], 0, [6, 0], ["y-MM-dd", "d MMM y", "d MMMM y", "EEEE d MMMM y"], ["HH 'h' mm", "HH 'h' mm 'min' ss 's'", "HH 'h' mm 'min' ss 's' z", "HH 'h' mm 'min' ss 's' zzzz"], ["{1} {0}", "{1}, {0}", "{1} 'à' {0}", u], [",", " ", ";", "%", "+", "-", "E", "×", "‰", "∞", "NaN", ":"], ["#,##0.###", "#,##0 %", "#,##0.00 ¤", "#E0"], "CAD", "$ CA", "dollar canadien", { "AUD": ["$ AU", "$"], "BEF": ["FB"], "BYN": [u, "Br"], "CAD": ["$ CA", "$"], "CYP": ["£CY"], "EGP": [u, "£E"], "FRF": ["F"], "GEL": [], "HKD": ["$ HK", "$"], "IEP": ["£IE"], "ILP": ["£IL"], "ILS": [u, "₪"], "INR": [u, "₹"], "ITL": ["₤IT"], "KRW": [u, "₩"], "LBP": [u, "£L"], "MTP": ["£MT"], "MXN": [u, "$"], "NZD": ["$ NZ", "$"], "PHP": [u, "₱"], "RHD": ["$RH"], "RON": [u, "L"], "RWF": [u, "FR"], "SGD": ["$ SG", "$"], "TOP": [u, "$T"], "TWD": [u, "NT$"], "USD": ["$ US", "$"], "VND": [u, "₫"], "XAF": [], "XCD": [u, "$"], "XOF": [], "XPF": [] }, "ltr", plural];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnItQ0EuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21tb24vbG9jYWxlcy9mci1DQS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCwwQ0FBMEM7QUFDMUMsTUFBTSxDQUFDLEdBQUcsU0FBUyxDQUFDO0FBRXBCLFNBQVMsTUFBTSxDQUFDLEdBQVc7SUFDM0IsTUFBTSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsRUFBRSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUUxSyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDbEIsT0FBTyxDQUFDLENBQUM7SUFDYixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoRixPQUFPLENBQUMsQ0FBQztJQUNiLE9BQU8sQ0FBQyxDQUFDO0FBQ1QsQ0FBQztBQUVELGVBQWUsQ0FBQyxPQUFPLEVBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsRUFBQyxDQUFDLE1BQU0sRUFBQyxNQUFNLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsTUFBTSxFQUFDLE1BQU0sQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLENBQUMsRUFBQyxDQUFDLFVBQVUsRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLFVBQVUsRUFBQyxPQUFPLEVBQUMsVUFBVSxFQUFDLFFBQVEsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sQ0FBQyxFQUFDLENBQUMsU0FBUyxFQUFDLFNBQVMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLE1BQU0sRUFBQyxXQUFXLEVBQUMsU0FBUyxFQUFDLFVBQVUsRUFBQyxVQUFVLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsV0FBVyxFQUFDLFdBQVcsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLG9CQUFvQixFQUFDLG9CQUFvQixDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxTQUFTLEVBQUMsU0FBUyxFQUFDLFVBQVUsRUFBQyxlQUFlLENBQUMsRUFBQyxDQUFDLFdBQVcsRUFBQyx3QkFBd0IsRUFBQywwQkFBMEIsRUFBQyw2QkFBNkIsQ0FBQyxFQUFDLENBQUMsU0FBUyxFQUFDLFVBQVUsRUFBQyxhQUFhLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsV0FBVyxFQUFDLFNBQVMsRUFBQyxZQUFZLEVBQUMsS0FBSyxDQUFDLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxpQkFBaUIsRUFBQyxFQUFDLEtBQUssRUFBQyxDQUFDLE1BQU0sRUFBQyxHQUFHLENBQUMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxJQUFJLENBQUMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsTUFBTSxFQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssRUFBQyxDQUFDLEtBQUssQ0FBQyxFQUFDLEtBQUssRUFBQyxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxHQUFHLENBQUMsRUFBQyxLQUFLLEVBQUMsRUFBRSxFQUFDLEtBQUssRUFBQyxDQUFDLE1BQU0sRUFBQyxHQUFHLENBQUMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxLQUFLLENBQUMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxLQUFLLENBQUMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDLEVBQUMsR0FBRyxDQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssRUFBQyxDQUFDLEtBQUssQ0FBQyxFQUFDLEtBQUssRUFBQyxDQUFDLENBQUMsRUFBQyxHQUFHLENBQUMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsS0FBSyxDQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssRUFBQyxDQUFDLE1BQU0sRUFBQyxHQUFHLENBQUMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDLEVBQUMsR0FBRyxDQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsS0FBSyxDQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssRUFBQyxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxNQUFNLEVBQUMsR0FBRyxDQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBQyxDQUFDLENBQUMsRUFBQyxLQUFLLENBQUMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxNQUFNLEVBQUMsR0FBRyxDQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssRUFBQyxFQUFFLEVBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssRUFBQyxFQUFFLEVBQUMsS0FBSyxFQUFDLEVBQUUsRUFBQyxFQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG4vLyBUSElTIENPREUgSVMgR0VORVJBVEVEIC0gRE8gTk9UIE1PRElGWS5cbmNvbnN0IHUgPSB1bmRlZmluZWQ7XG5cbmZ1bmN0aW9uIHBsdXJhbCh2YWw6IG51bWJlcik6IG51bWJlciB7XG5jb25zdCBuID0gdmFsLCBpID0gTWF0aC5mbG9vcihNYXRoLmFicyh2YWwpKSwgdiA9IHZhbC50b1N0cmluZygpLnJlcGxhY2UoL15bXi5dKlxcLj8vLCAnJykubGVuZ3RoLCBlID0gcGFyc2VJbnQodmFsLnRvU3RyaW5nKCkucmVwbGFjZSgvXlteZV0qKGUoWy0rXT9cXGQrKSk/LywgJyQyJykpIHx8IDA7XG5cbmlmIChpID09PSAwIHx8IGkgPT09IDEpXG4gICAgcmV0dXJuIDE7XG5pZiAoZSA9PT0gMCAmJiAoIShpID09PSAwKSAmJiAoaSAlIDEwMDAwMDAgPT09IDAgJiYgdiA9PT0gMCkpIHx8ICEoZSA+PSAwICYmIGUgPD0gNSkpXG4gICAgcmV0dXJuIDQ7XG5yZXR1cm4gNTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgW1wiZnItQ0FcIixbW1wiYVwiLFwicFwiXSxbXCJhLm0uXCIsXCJwLm0uXCJdLHVdLFtbXCJhLm0uXCIsXCJwLm0uXCJdLHUsdV0sW1tcIkRcIixcIkxcIixcIk1cIixcIk1cIixcIkpcIixcIlZcIixcIlNcIl0sW1wiZGltLlwiLFwibHVuLlwiLFwibWFyLlwiLFwibWVyLlwiLFwiamV1LlwiLFwidmVuLlwiLFwic2FtLlwiXSxbXCJkaW1hbmNoZVwiLFwibHVuZGlcIixcIm1hcmRpXCIsXCJtZXJjcmVkaVwiLFwiamV1ZGlcIixcInZlbmRyZWRpXCIsXCJzYW1lZGlcIl0sW1wiZGlcIixcImx1XCIsXCJtYVwiLFwibWVcIixcImplXCIsXCJ2ZVwiLFwic2FcIl1dLHUsW1tcIkpcIixcIkZcIixcIk1cIixcIkFcIixcIk1cIixcIkpcIixcIkpcIixcIkFcIixcIlNcIixcIk9cIixcIk5cIixcIkRcIl0sW1wiamFudi5cIixcImbDqXZyLlwiLFwibWFyc1wiLFwiYXZyLlwiLFwibWFpXCIsXCJqdWluXCIsXCJqdWlsbC5cIixcImFvw7t0XCIsXCJzZXB0LlwiLFwib2N0LlwiLFwibm92LlwiLFwiZMOpYy5cIl0sW1wiamFudmllclwiLFwiZsOpdnJpZXJcIixcIm1hcnNcIixcImF2cmlsXCIsXCJtYWlcIixcImp1aW5cIixcImp1aWxsZXRcIixcImFvw7t0XCIsXCJzZXB0ZW1icmVcIixcIm9jdG9icmVcIixcIm5vdmVtYnJlXCIsXCJkw6ljZW1icmVcIl1dLHUsW1tcImF2LiBKLi1DLlwiLFwiYXAuIEouLUMuXCJdLHUsW1wiYXZhbnQgSsOpc3VzLUNocmlzdFwiLFwiYXByw6hzIErDqXN1cy1DaHJpc3RcIl1dLDAsWzYsMF0sW1wieS1NTS1kZFwiLFwiZCBNTU0geVwiLFwiZCBNTU1NIHlcIixcIkVFRUUgZCBNTU1NIHlcIl0sW1wiSEggJ2gnIG1tXCIsXCJISCAnaCcgbW0gJ21pbicgc3MgJ3MnXCIsXCJISCAnaCcgbW0gJ21pbicgc3MgJ3MnIHpcIixcIkhIICdoJyBtbSAnbWluJyBzcyAncycgenp6elwiXSxbXCJ7MX0gezB9XCIsXCJ7MX0sIHswfVwiLFwiezF9ICfDoCcgezB9XCIsdV0sW1wiLFwiLFwiwqBcIixcIjtcIixcIiVcIixcIitcIixcIi1cIixcIkVcIixcIsOXXCIsXCLigLBcIixcIuKInlwiLFwiTmFOXCIsXCI6XCJdLFtcIiMsIyMwLiMjI1wiLFwiIywjIzDCoCVcIixcIiMsIyMwLjAwwqDCpFwiLFwiI0UwXCJdLFwiQ0FEXCIsXCIkwqBDQVwiLFwiZG9sbGFyIGNhbmFkaWVuXCIse1wiQVVEXCI6W1wiJMKgQVVcIixcIiRcIl0sXCJCRUZcIjpbXCJGQlwiXSxcIkJZTlwiOlt1LFwiQnJcIl0sXCJDQURcIjpbXCIkwqBDQVwiLFwiJFwiXSxcIkNZUFwiOltcIsKjQ1lcIl0sXCJFR1BcIjpbdSxcIsKjRVwiXSxcIkZSRlwiOltcIkZcIl0sXCJHRUxcIjpbXSxcIkhLRFwiOltcIiTCoEhLXCIsXCIkXCJdLFwiSUVQXCI6W1wiwqNJRVwiXSxcIklMUFwiOltcIsKjSUxcIl0sXCJJTFNcIjpbdSxcIuKCqlwiXSxcIklOUlwiOlt1LFwi4oK5XCJdLFwiSVRMXCI6W1wi4oKkSVRcIl0sXCJLUldcIjpbdSxcIuKCqVwiXSxcIkxCUFwiOlt1LFwiwqNMXCJdLFwiTVRQXCI6W1wiwqNNVFwiXSxcIk1YTlwiOlt1LFwiJFwiXSxcIk5aRFwiOltcIiTCoE5aXCIsXCIkXCJdLFwiUEhQXCI6W3UsXCLigrFcIl0sXCJSSERcIjpbXCIkUkhcIl0sXCJST05cIjpbdSxcIkxcIl0sXCJSV0ZcIjpbdSxcIkZSXCJdLFwiU0dEXCI6W1wiJMKgU0dcIixcIiRcIl0sXCJUT1BcIjpbdSxcIiRUXCJdLFwiVFdEXCI6W3UsXCJOVCRcIl0sXCJVU0RcIjpbXCIkwqBVU1wiLFwiJFwiXSxcIlZORFwiOlt1LFwi4oKrXCJdLFwiWEFGXCI6W10sXCJYQ0RcIjpbdSxcIiRcIl0sXCJYT0ZcIjpbXSxcIlhQRlwiOltdfSxcImx0clwiLCBwbHVyYWxdO1xuIl19