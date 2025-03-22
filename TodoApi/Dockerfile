# שימוש ב-Image רשמי של .NET SDK לבניית האפליקציה
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# העתקת קבצי הפרויקט והתקנת התלויות
COPY *.csproj ./
RUN dotnet restore

# העתקת שאר הקבצים ובניית האפליקציה
COPY . ./
RUN dotnet publish -c Release -o out

# שימוש ב-Image קל משקל להרצת האפליקציה
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/out ./

# פתיחת פורט 80 (או הפורט שבו האפליקציה רצה)
EXPOSE 80

# הפקודה שמפעילה את האפליקציה
ENTRYPOINT ["dotnet", "TodoApi.dll"]
