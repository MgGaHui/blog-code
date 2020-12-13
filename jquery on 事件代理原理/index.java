class Solution {
        public String addStrings(String num1, String num2) {
           int len1=num1.length();
           int len2=num2.length();
           char[] str1=new char [len1];
           char[] str2=new char [len2];
           for(int i=0;i<len1;i++)
               str1[i]=num1.charAt(i);
           for(int j=0;j<len1;j++)
               str1[j]=num2.charAt(j);  
            int temp=0;//进位
            int len3=len1<=len2?len1:len2;
            String sum="";
            for(int i=len1-1;i>=0;i--)
            {
                sum.concat(String.valueOf(str1[i]+str2[i]+temp));
                temp=(str1[i]+str2[i])>10?1:0;
            }
            //剩余字符串
            if(len1<len2)
            {
                if(temp==1){
                //    sum.concat(String.valueOf(str2[len1]+temp));
                sum+=str2[len1]+temp;
                }else{
                    //  sum.concat(String.valueOf(str2[len1])) ;
                     sum+=str2[len1];
                }
               for(int i=len1+1;i<len2-len1;i++)
               {
                //    sum.concat(String.valueOf(str2[i])) ;
                 sum+=str2[i];
               }
            } else if(len1>len2)
                if(temp==1){
                //    sum.concat(String.valueOf(str1[len1]+temp));
                 sum+=str1[len2]+temp;
                }else{
                    //  sum.concat(String.valueOf(str1[len1])) ;
                     sum+=str1[len2];
                }
               for(int i=len2+1;i<len1-len2;i++)
               {
                //    sum.concat(String.valueOf(str1[i])) ;
                 sum+=str1[i];
               }
            }
            //翻转字符串
            int len4=sum.length();
            char[] str3=new char[len4];
            for(int i=0;i<len4;i++)
            {
                str3[i]=sum.charAt(i);
            }
            for(int j=0;j<len4/2;j++)
            {
                char tem;
                tem=str3[j];
                str3[j]=str3[len4-j-1];
                str3[len4-j-1]=tem;
            }
            String str="";
            for(int i=0;i<len4;i++)
            {
                str+=str3;
            }
            return str;
            
        }