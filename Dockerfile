FROM mcr.microsoft.com/dotnet/core/aspnet:3.0.0-preview6 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/core/sdk:3.0.100-preview6 AS build
RUN curl -sL https://deb.nodesource.com/setup_10.x |  bash -
RUN apt-get install -y nodejs

WORKDIR /src
COPY ["Grpc.Web/Grpc.Web.csproj", "Grpc.Web/"]
RUN dotnet restore "Grpc.Web/Grpc.Web.csproj"
COPY . .
RUN dotnet build "Grpc.Web.sln" -c Release -o /app

FROM build AS publish
WORKDIR "/src/Grpc.Web"
RUN dotnet publish "Grpc.Web.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "Grpc.Web.dll"]